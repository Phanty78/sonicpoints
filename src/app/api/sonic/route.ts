import { NextResponse } from 'next/server';

const API_URL =
  'https://www.data-openblocklabs.com/sonic/user-points-stats?wallet_address=0x83C1049Fd0E07ae545C051389251CAE5b4285C6f';

export async function GET() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
