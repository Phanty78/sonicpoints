import { NextResponse } from 'next/server';

export async function GET(request) {
  const GemXAddress = '0x05F0c7Ca7B90e3786603108D42cA8DFd28d72075';
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
      `https://api.sonicscan.org/api
        ?module=account
        &action=tokenbalance
        &contractaddress=${GemXAddress}
        &address=${address}
        &tag=latest&apikey=${process.env.NEXT_PUBLIC_SONIC_API_KEY}`
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in sonic route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
