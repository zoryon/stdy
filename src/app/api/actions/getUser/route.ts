import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    const url = new URL(req.url);
    const supabaseUserId = url.searchParams.get('supabaseUserId');

    if (!supabaseUserId) {
        return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: supabaseUserId },
        });

        if (user) {
            return NextResponse.json(user, { status: 200 });
        } else {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
