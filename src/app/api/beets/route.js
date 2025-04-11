import { NextResponse } from 'next/server';
import { BEETS_FRAGMENT_S1 } from '@/constants/constants';
import connectDB from '@/lib/mongodb';
import User from '@/models/userModel';
import { hasBeenMoreThan24HoursForDb } from '@/utils/dates';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const sonicApiKey = process.env.SONIC_API_KEY;

    const RequestURL = `https://api.sonicscan.org/api?module=account&action=tokenbalance&contractaddress=${BEETS_FRAGMENT_S1}&address=${address}&tag=latest&apikey=${sonicApiKey}`;

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    await connectDB();

    const response = await fetch(RequestURL);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const beetsData = await response.json();

    let user = await User.findOne({ address });

    if (!user) {
      user = new User({
        address,
        data: {
          beetsData: {
            beetsPoints: beetsData.result.slice(0, -17).toString() || 0,
            history: [
              {
                date: new Date(),
                beetsPoints: beetsData.result.slice(0, -17).toString() || 0,
              },
            ],
          },
        },
      });
    } else {
      if (!user.data.swapxData) {
        user.data.beetsData = {
          beetsPoints: beetsData.result.slice(0, -17).toString() || 0,
          history: [
            {
              date: new Date(),
              beetsPoints: beetsData.result.slice(0, -17).toString() || 0,
            },
          ],
        };
      }

      user.data.beetsData.beetsPoints =
        beetsData.result.slice(0, -17).toString() || 0;
      user.data.date = new Date();

      const lastHistoryEntry =
        user.data.beetsData.history[user.data.beetsData.history.length - 1];
      if (hasBeenMoreThan24HoursForDb(lastHistoryEntry?.date)) {
        const newHistoryEntry = {
          date: new Date(),
          beetsPoints: beetsData.result.slice(0, -17).toString() || 0,
        };

        if (user.data.beetsData.history.length >= 30) {
          user.data.beetsData.history.shift();
        }

        user.data.beetsData.history.push(newHistoryEntry);
      }
    }

    await user.save();

    return NextResponse.json({
      success: true,
      data: beetsData,
      saved: true,
      historyUpdated: hasBeenMoreThan24HoursForDb(
        user.data.beetsData.history[user.data.beetsData.history.length - 1]
          ?.date
      ),
      beetsHistory: user.data.beetsData?.history || [],
    });
  } catch (error) {
    console.error('❌ Error in beets route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
