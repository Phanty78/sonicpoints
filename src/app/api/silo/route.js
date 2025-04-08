import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/userModel';
import { hasBeenMoreThan24HoursForDb } from '@/utils/dates';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    // Connexion à MongoDB
    await connectDB();

    // Récupération des données depuis l'API Silo
    const response = await fetch(
      `https://api-points.silo.finance/points/leaderboard?account=${address}`
    );
    const siloData = await response.json();

    // Recherche ou création de l'utilisateur
    let user = await User.findOne({ address });

    if (!user) {
      // Créer un nouvel utilisateur si n'existe pas
      user = new User({
        address,
        data: {
          siloData: {
            siloPoints: siloData.topAccounts[3].points.toFixed(1) || 0,
            siloRank: siloData.topAccounts[3].position || 0,
            history: [
              {
                date: new Date(),
                siloPoints: siloData.topAccounts[3].points.toFixed(1) || 0,
                siloRank: siloData.topAccounts[3].rank || 0,
              },
            ],
          },
        },
      });
    } else {
      if (!user.data.siloData) {
        user.data.siloData = {
          siloPoints: siloData.topAccounts[3].points.toFixed(1) || 0,
          siloRank: siloData.topAccounts[3].position || 0,
          history: [
            {
              date: new Date(),
              siloPoints: siloData.topAccounts[3].points.toFixed(1) || 0,
              siloRank: siloData.topAccounts[3].position || 0,
            },
          ],
        };
      }
      // Mettre à jour les données existantes
      user.data.siloData.siloPoints =
        siloData.topAccounts[3].points.toFixed(1) || 0;
      user.data.siloData.siloRank = siloData.topAccounts[3].position || 0;
      user.data.date = new Date();

      // Vérifier si la dernière entrée date de plus de 24h
      const lastHistoryEntry =
        user.data.siloData.history[user.data.siloData.history.length - 1];
      if (hasBeenMoreThan24HoursForDb(lastHistoryEntry?.date)) {
        user.data.siloData.history.push({
          date: new Date(),
          siloPoints: siloData.topAccounts[3].points.toFixed(1) || 0,
          siloRank: siloData.topAccounts[3].position || 0,
        });
      }
    }

    // Sauvegarder les modifications
    await user.save();

    return NextResponse.json({
      success: true,
      data: siloData,
      saved: true,
      historyUpdated: hasBeenMoreThan24HoursForDb(
        user.data.siloData.history[user.data.siloData.history.length - 1]?.date
      ),
    });
  } catch (error) {
    console.error('Error in silo route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

//TODO - limiter l'historique à 30 jours
