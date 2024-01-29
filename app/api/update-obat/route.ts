import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { id, nama_obat, stok_awal, pemakaian, penerimaan, sisa_stok, jumlah_stok, bulan, tahun } = body;

  const obat = await prisma.laporanTransaksi.update({
    where: {
      id: id,
    },
    data: {
        nama_obat: nama_obat,
        stok_awal: stok_awal,
        pemakaian: parseInt(pemakaian) as number,
        penerimaan: parseInt(penerimaan) as number,
        sisa_stok: parseInt(sisa_stok) as number,
        jumlah_stok: jumlah_stok,
        bulan: bulan,
        tahun: tahun,
    },
  });

  return NextResponse.json(obat);
}