import { sql } from '@vercel/postgres';
import { prisma } from '../../lib/prisma';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { dataObat } from '../../data_obat';
import { DataMaster } from '../types';

export async function getUser(username: string) {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
}

export async function createUser(username: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await prisma.user.create({
    data: {
      username: username,
      password: hash,
    },
  });
}

export async function getObat() {
  return await prisma.laporanTransaksi.findMany();
}

export async function createObat(
  nama_obat: string,
  pemakaian: number,
  penerimaan: number,
  sisa_stok: number,
  bulan: number,
  tahun: number,
) {
  return await prisma.laporanTransaksi.create({
    data: {
      nama_obat,
      pemakaian,
      penerimaan,
      sisa_stok,
      bulan,
      tahun,
    },
  });
}

export async function updateObat(
  id: string,
  nama_obat: string,
  pemakaian: number,
  penerimaan: number,
  sisa_stok: number,
  bulan: number,
  tahun: number,) {
  return await prisma.laporanTransaksi.update({
    where: {
      id: id,
    },
    data: {
      nama_obat: nama_obat,
      pemakaian: pemakaian,
      penerimaan: penerimaan,
      sisa_stok: sisa_stok,
      bulan: bulan,
      tahun: tahun,
    },
  });
}



