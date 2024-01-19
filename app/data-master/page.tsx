import { sql } from '@vercel/postgres';
import { Card, Metric, Button } from '@tremor/react';

import Search from '../search';
import UsersTable from '../table';
import MasterTable from './masterTable';

interface DataMaster {
  id: number;
  nama_obat: string;
  pemakaian: string;
  penerimaan: string;
  sisa_stok: number;
  bulan: number;
  tahun: number;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const result = await sql`
    SELECT id, nama_obat, pemakaian, penerimaan, sisa_stok, bulan, tahun 
    FROM transaksi_bulanan
    WHERE nama_obat ILIKE ${'%' + search + '%'};
  `;
  const data = result.rows as DataMaster[];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Metric>Data Obat dan Alat Kesehatan </Metric>
      <div className="flex items-center justify-between">
        <Search />
        <Button>Tambah Data</Button>
      </div>
      <Card className="mt-6">
        <MasterTable data={data} />
      </Card>
    </main>
  );
}
