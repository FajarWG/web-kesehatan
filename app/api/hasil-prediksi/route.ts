import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const url = req.url;

  const querySearch = url.split('?')[1].split('&')[0].split('=')[1] || '';

  const hasilPrediksi = await prisma.pengadaan.findMany({
    orderBy: {
      createdAt: 'asc'
    },
    take: 1
  });

  const bulan = hasilPrediksi[0]?.bulan;
  const tahun = hasilPrediksi[0]?.tahun;

  const queryDate = url.split('?')[1].split('&')[1].split('=')[1] || '';

  const bulanfilter = (parseInt(queryDate.split('-')[1]) as any) || '';
  const tahunfilter = (parseInt(queryDate.split('-')[0]) as any) || '';

  if (queryDate != '') {
    const obat = await prisma.pengadaan.findMany({
      where: {
        nama_obat: {
          contains: querySearch
        },
        bulan: {
          equals: bulanfilter
        },
        tahun: {
          equals: tahunfilter
        }
      }
    });

    return NextResponse.json(obat);
  } else {
    const obat = await prisma.pengadaan.findMany({
      take: 10,
      where: {
        nama_obat: {
          contains: querySearch
        },
        bulan: bulan,
        tahun: tahun
      }
    });
    return NextResponse.json(obat);
  }
}
