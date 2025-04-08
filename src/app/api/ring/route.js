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
      `https://points-api.rings.money/points/${address}`
    );
    const ringData = await response.json();

    let user = await User.findOne({ address });

    if (!user) {
      user = new User({
        address,
        data: {
          ringData: {
            ringPoints: ringData.total.slice(0, -36) || 0,
            history: [
              {
                date: new Date(),
                ringPoints: ringData.total.slice(0, -36) || 0,
              },
            ],
          },
        },
      });
    } else {
      if (!user.data.ringData) {
        user.data.ringData = {
          ringPoints: ringData.total.slice(0, -36) || 0,
          history: [
            {
              date: new Date(),
              ringPoints: ringData.total.slice(0, -36) || 0,
            },
          ],
        };
      }
      user.data.ringData.ringPoints = ringData.total.slice(0, -36) || 0;
      user.data.date = new Date();
      const lastHistoryEntry =
        user.data.ringData.history[user.data.ringData.history.length - 1];
      if (hasBeenMoreThan24HoursForDb(lastHistoryEntry?.date)) {
        user.data.ringData.history.push({
          date: new Date(),
          ringPoints: ringData.total.slice(0, -36) || 0,
        });
      }
    }

    await user.save();

    return NextResponse.json({
      success: true,
      data: ringData,
      saved: true,
      historyUpdated: hasBeenMoreThan24HoursForDb(
        user.data.ringData.history[user.data.ringData.history.length - 1]?.date
      ),
    });
  } catch (error) {
    console.error('Error in ring route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
