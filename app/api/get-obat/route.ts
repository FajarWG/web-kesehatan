import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {

  const url = req.url;
  const querySearch = url.split('?')[1].split('&')[0].split('=')[1] || '';
  const queryDate = url.split('?')[1].split('&')[1].split('=')[1] || '';

  const bulan = parseInt(queryDate.split('-')[1]) as any || '';
  const tahun = parseInt(queryDate.split('-')[0]) as any || '';

  if(queryDate != ''){
    const obat = await prisma.laporanTransaksi.findMany({
      take: 10,
      where: {
        nama_obat: {
          contains: querySearch,
        },
        bulan: {
          equals: bulan,
        },
        tahun: {
          equals: tahun,
        },
      },
    });

  return NextResponse.json(obat);
  }else{
    const obat = await prisma.laporanTransaksi.findMany({
      take: 10,
      where: {
        nama_obat: {
          contains: querySearch,
        },
      },
    });
    return NextResponse.json(obat);

  }

}