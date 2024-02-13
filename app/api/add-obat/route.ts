import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  const obat = await prisma.laporanTransaksi.createMany({
    data: body.data,
    skipDuplicates: true
  });

  return NextResponse.json(obat);
}
