import { Title, Text, Metric } from '@tremor/react';
import Image from 'next/image';

export default async function IndexPage(){

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex flex-col md:flex-row md:space-x-4 mt-14'>
        <div className='flex flex-col mt-2 gap-6 w-1/2'>
          <Metric>Sistem Pengadaan Obat dan Alat Kesehatan Puskesmas Bagendit</Metric>
          <Text>Gunakan data laporan transaksi bulan sebelumnya untuk memprediksi jumlah pengadaan obat dan alat kesehatan dengan model regresi linear</Text>
        </div>
        <div className='flex flex-col gap-2 items-end text-end'>
          <Image src='https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='' width={500} height={500} />
          <Text className='text-lg'>Lakukan pengadaan dengan memasukan data laporan transaksi bulan sebelumnya terlebih dahulu</Text>
        </div>
      </div>
    </main>
  );
}
