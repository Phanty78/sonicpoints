import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const response = await fetch(
      `https://gems.kaliasdeveloper.workers.dev/data`
    );

    const priceData = await response.json();

    return NextResponse.json({
      success: true,
      data: priceData,
    });
  } catch (error) {
    console.error('Error in price route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
