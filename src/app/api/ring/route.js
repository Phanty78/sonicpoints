import { NextResponse } from 'next/server';

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

    const response = await fetch(
      `https://points-api.rings.money/points/${address}`
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in ring route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
