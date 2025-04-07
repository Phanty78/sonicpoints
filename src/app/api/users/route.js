import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/userModel';

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({});
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const user = new User(data);
    await user.save();
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur lors de la création de l'utilisateur" },
      { status: 500 }
    );
  }
}
