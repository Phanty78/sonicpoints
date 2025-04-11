import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/userModel';
import { SPT_ADDRESS } from '@/constants/constants';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const sonicApiKey = process.env.SONIC_API_KEY;

    const RequestURL = `https://api.sonicscan.org/api?module=account&action=tokenbalance&contractaddress=${SPT_ADDRESS}&address=${address}&tag=latest&apikey=${sonicApiKey}`;

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

    const sptData = await response.json();

    let user = await User.findOne({ address });

    if (!user) {
      user = new User({
        address,
        data: {
          sptData: {
            spToken: sptData.result,
          },
        },
      });
    } else {
      if (!user.data.sptData) {
        user.data.sptData = {
          spToken: sptData.result,
        };
      }

      user.data.sptData.spToken = sptData.result;
      user.data.date = new Date();
    }

    await user.save();

    return NextResponse.json({
      success: true,
      data: sptData,
      saved: true,
      spToken: user.data.sptData?.spToken || 0,
    });
  } catch (error) {
    console.error('❌ Error in spt route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
