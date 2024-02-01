import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {

    const namaObat = await prisma.obatAlat.findMany();

    return NextResponse.json(namaObat);

}