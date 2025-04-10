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

    await connectDB();

    const response = await fetch(
      `https://www.data-openblocklabs.com/sonic/user-points-stats?wallet_address=${address}`
    );
    const sonicData = await response.json();

    let user = await User.findOne({ address });

    if (!user) {
      user = new User({
        address,
        data: {
          sonicData: {
            sonicPoints: sonicData.sonic_points.toFixed(1),
            liquidityPoints: sonicData.passive_liquidity_points.toFixed(1),
            activePoints: sonicData.active_liquidity_points.toFixed(1),
            sonicRank: sonicData.rank,
            history: [
              {
                date: new Date(),
                sonicPoints: sonicData.sonic_points.toFixed(1),
                liquidityPoints: sonicData.passive_liquidity_points.toFixed(1),
                activePoints: sonicData.active_liquidity_points.toFixed(1),
                sonicRank: sonicData.rank,
              },
            ],
          },
        },
      });
    } else {
      if (!user.data.sonicData) {
        user.data.sonicData = {
          sonicPoints: sonicData.sonic_points.toFixed(1),
          liquidityPoints: sonicData.passive_liquidity_points.toFixed(1),
          activePoints: sonicData.active_liquidity_points.toFixed(1),
          sonicRank: sonicData.rank,
          history: [
            {
              date: new Date(),
              sonicPoints: sonicData.sonic_points.toFixed(1),
              liquidityPoints: sonicData.passive_liquidity_points.toFixed(1),
              activePoints: sonicData.active_liquidity_points.toFixed(1),
              sonicRank: sonicData.rank,
            },
          ],
        };
      }
      // Mettre à jour les données existantes
      user.data.sonicData.sonicPoints = sonicData.sonic_points.toFixed(1);
      user.data.sonicData.liquidityPoints =
        sonicData.passive_liquidity_points.toFixed(1);
      user.data.sonicData.activePoints =
        sonicData.active_liquidity_points.toFixed(1);
      user.data.sonicData.sonicRank = sonicData.rank;
      user.data.date = new Date();

      // Vérifier si 24h se sont écoulées depuis la dernière entrée
      const lastHistoryEntry =
        user.data.sonicData.history[user.data.sonicData.history.length - 1];
      if (hasBeenMoreThan24HoursForDb(lastHistoryEntry?.date)) {
        // Créer une nouvelle entrée dans l'historique
        const newHistoryEntry = {
          date: new Date(),
          sonicPoints: sonicData.sonic_points.toFixed(1),
          liquidityPoints: sonicData.passive_liquidity_points.toFixed(1),
          activePoints: sonicData.active_liquidity_points.toFixed(1),
          sonicRank: sonicData.rank,
        };

        // Si l'historique atteint 30 entrées, supprimer la plus ancienne
        if (user.data.sonicData.history.length >= 30) {
          user.data.sonicData.history.shift(); // Supprime la première entrée
        }

        user.data.sonicData.history.push(newHistoryEntry);
      }
    }

    await user.save();

    return NextResponse.json({
      success: true,
      data: sonicData,
      history: user.data.sonicData.history,
      saved: true,
      historyUpdated: hasBeenMoreThan24HoursForDb(
        user.data.sonicData.history[user.data.sonicData.history.length - 1]
          ?.date
      ),
    });
  } catch (error) {
    console.error('Error in sonic route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
