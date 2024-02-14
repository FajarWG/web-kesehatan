import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  // data [ { id: 1, nama_obat: 'Paracetamol', pemakaian: '100', penerimaan: '50', sisa_stok: 50, bulan: 1, tahun: 2021 } ]
  let dataPredeksi = body;

  const bulan = dataPredeksi[0].bulan;
  const tahun = dataPredeksi[0].tahun;

  dataPredeksi = dataPredeksi.map((item: any) => {
    return {
      'Nama Obat': item.nama_obat,
      Pemakaian: parseInt(item.pemakaian),
      'Stok Awal': parseInt(item.stok_awal)
    };
  });

  await fetch('https://backend-rubi.onrender.com/predict_evaluate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataPredeksi)
  })
    .then((res) => res.json())
    .then(async (data) => {
      dataPredeksi = dataPredeksi.map((item: any, index: number) => {
        return {
          nama_obat: item['Nama Obat'],
          nilai_mae: data[index].evaluation_results.MAE,
          nilai_rsquare: data[index].evaluation_results.Rsquared,
          nilai_rmsp: data[index].evaluation_results.RMSE,
          jml_pengadaan: data[index].prediction,
          bulan: bulan,
          tahun: tahun
        };
      });

      console.log(dataPredeksi);

      await prisma.pengadaan.createMany({
        data: dataPredeksi,
        skipDuplicates: true
      });

      return NextResponse.json(dataPredeksi);
    });

  return NextResponse.json(dataPredeksi);
}
