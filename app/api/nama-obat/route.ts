import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const namaObat = await prisma.laporanTransaksi.findMany({
    select: {
      nama_obat: true
    }
  });

  return NextResponse.json(namaObat);
}
