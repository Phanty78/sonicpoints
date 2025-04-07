import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');
    const sonicApiKey = process.env.NEXT_PUBLIC_SONIC_API_KEY;
    const GemXAddress = '0x05F0c7Ca7B90e3786603108D42cA8DFd28d72075';

    const RequestURL = `https://api.sonicscan.org/api?module=account&action=tokenbalance&contractaddress=${GemXAddress}&address=${address}&tag=latest&apikey=${sonicApiKey}`;

    const response = await fetch(RequestURL);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    console.log('📦 Debug - API Response data:', data);

    if (data.status === '0') {
      console.log('❌ Error: API returned error status');
      return NextResponse.json(
        { error: data.message || 'API error' },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error in swapx route:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
