import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/userModel';
import { hasBeenMoreThan24HoursForDb } from '@/utils/dates';
import { GEMX_ADDRESS_SHADOW } from '@/constants/constants';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const sonicApiKey = process.env.SONIC_API_KEY;

    const RequestURL = `https://api.sonicscan.org/api?module=account&action=tokenbalance&contractaddress=${GEMX_ADDRESS_SHADOW}&address=${address}&tag=latest&apikey=${sonicApiKey}`;
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

    const shadowData = await response.json();

    let user = await User.findOne({ address });

    if (!user) {
      user = new User({
        address,
        data: {
          shadowData: {
            shadowPoints: shadowData.result.slice(0, -18) || 0,
            history: [
              {
                date: new Date(),
                shadowPoints: shadowData.result.slice(0, -18) || 0,
              },
            ],
          },
        },
      });
    } else {
      if (!user.data.shadowData) {
        user.data.shadowData = {
          shadowPoints: shadowData.result.slice(0, -18) || 0,
          history: [
            {
              date: new Date(),
              shadowPoints: shadowData.result.slice(0, -18) || 0,
            },
          ],
        };
      }

      user.data.shadowData.shadowPoints = shadowData.result.slice(0, -18) || 0;
      user.data.date = new Date();

      const lastHistoryEntry =
        user.data.shadowData.history[user.data.shadowData.history.length - 1];
      if (hasBeenMoreThan24HoursForDb(lastHistoryEntry?.date)) {
        const newHistoryEntry = {
          date: new Date(),
          shadowPoints: shadowData.result.slice(0, -18) || 0,
        };

        if (user.data.shadowData.history.length >= 30) {
          user.data.shadowData.history.shift();
        }

        user.data.shadowData.history.push(newHistoryEntry);
      }
    }

    await user.save();

    return NextResponse.json({
      success: true,
      data: shadowData,
      saved: true,
      historyUpdated: hasBeenMoreThan24HoursForDb(
        user.data.shadowData.history[user.data.shadowData.history.length - 1]
          ?.date
      ),
      shadowHistory: user.data.shadowData?.history || [],
    });
  } catch (error) {
    console.error('❌ Error in shadow route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
