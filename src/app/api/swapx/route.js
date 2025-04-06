import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const sonicApiKey = process.env.NEXT_PUBLIC_SONIC_API_KEY;
    const GemXAddress = '0x05F0c7Ca7B90e3786603108D42cA8DFd28d72075';
    const RequestURL = `https://api.sonicscan.org/api
        ?module=account
        &action=tokenbalance
        &contractaddress=${GemXAddress}
        &address=${address}
        &tag=latest&apikey=${sonicApiKey}`;

    console.log(RequestURL);

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    if (!sonicApiKey) {
      return NextResponse.json(
        { error: 'Sonic API key is not set' },
        { status: 500 }
      );
    }

    if (!GemXAddress) {
      return NextResponse.json(
        { error: 'GemX address is not set' },
        { status: 500 }
      );
    }

    const response = await fetch(RequestURL);
    const data = await response.json();
    console.log(data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in sonic route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
