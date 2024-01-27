"use client";

import React,{useState, useEffect} from 'react';
import { Card, Metric, Button } from '@tremor/react';
 
import Search from '../components/search';
import MasterTable from './masterTable';
import Link from 'next/link';

interface DataMaster {
  id: number;
  nama_obat: string;
  pemakaian: string;
  penerimaan: string;
  sisa_stok: number;
  bulan: number;
  tahun: number;
}

export default function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const [searchDate, setSearchDate] = useState<string>('');

  const [data, setData] = useState<DataMaster[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/get-obat?search=${search}&searchDate=${searchDate}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [search, searchDate]);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Metric>Data Obat dan Alat Kesehatan </Metric>
      <div className="flex items-center justify-between">
        <div className='flex flex-row items-end gap-5'>
        <input type="month" 
          className="h-10 block rounded-md border border-gray-200 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Search by name..."
          spellCheck={false}
          onChange={(e) => setSearchDate(e.target.value)}
          />
        <Search />
        </div>
        <Button>
          <Link href="/data-master/addData">
            Tambah Data
          </Link>
        </Button>
      </div>
      <Card className="mt-6">
        <MasterTable data={data} />
      </Card>
    </main>
  );
}
