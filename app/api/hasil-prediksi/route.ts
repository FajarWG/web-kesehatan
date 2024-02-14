import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const hasilPrediksi = await prisma.pengadaan.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    take: 1
  });

  const bulan = hasilPrediksi[0]?.bulan;
  const tahun = hasilPrediksi[0]?.tahun;

  const dataPrediksi = await prisma.pengadaan.findMany({
    where: {
      bulan: bulan,
      tahun: tahun
    }
  });

  return NextResponse.json(dataPrediksi);
}
