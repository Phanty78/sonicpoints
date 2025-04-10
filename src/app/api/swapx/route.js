import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/userModel';
import { hasBeenMoreThan24HoursForDb } from '@/utils/dates';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const sonicApiKey = process.env.SONIC_API_KEY;
    const GemXAddress = '0x05F0c7Ca7B90e3786603108D42cA8DFd28d72075';

    const RequestURL = `https://api.sonicscan.org/api?module=account&action=tokenbalance&contractaddress=${GemXAddress}&address=${address}&tag=latest&apikey=${sonicApiKey}`;

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

    const swapxData = await response.json();

    let user = await User.findOne({ address });

    if (!user) {
      user = new User({
        address,
        data: {
          swapxData: {
            swapxPoints: swapxData.result.slice(0, -18) || 0,
            history: [
              {
                date: new Date(),
                swapxPoints: swapxData.result.slice(0, -18) || 0,
              },
            ],
          },
        },
      });
    } else {
      if (!user.data.swapxData) {
        user.data.swapxData = {
          swapxPoints: swapxData.result.slice(0, -18) || 0,
          history: [
            {
              date: new Date(),
              swapxPoints: swapxData.result.slice(0, -18) || 0,
            },
          ],
        };
      }

      user.data.swapxData.swapxPoints = swapxData.result.slice(0, -18) || 0;
      user.data.date = new Date();

      const lastHistoryEntry =
        user.data.swapxData.history[user.data.swapxData.history.length - 1];
      if (hasBeenMoreThan24HoursForDb(lastHistoryEntry?.date)) {
        const newHistoryEntry = {
          date: new Date(),
          swapxPoints: swapxData.result.slice(0, -18) || 0,
        };

        if (user.data.swapxData.history.length >= 30) {
          user.data.swapxData.history.shift();
        }

        user.data.swapxData.history.push(newHistoryEntry);
      }
    }

    await user.save();

    return NextResponse.json({
      success: true,
      data: swapxData,
      saved: true,
      historyUpdated: hasBeenMoreThan24HoursForDb(
        user.data.swapxData.history[user.data.swapxData.history.length - 1]
          ?.date
      ),
      swapxHistory: user.data.swapxData?.history || [],
    });
  } catch (error) {
    console.error('❌ Error in swapx route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
