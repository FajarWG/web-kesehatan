import { Title, Text, Metric } from '@tremor/react';

export default async function IndexPage(){

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className='flex flex-col md:flex-row md:space-x-4'>
        <div className='flex-1 '>
        <Metric>Sistem Pengadaan Obat dan Alat Kesehatan Puskesmas Bagendit</Metric>
        <Text>Gunakan data laporan transaksi bulan sebelumnya untuk memprediksi jumlah pengadaan obat dan alat kesehatan dengan model regresi linear</Text>
        </div>
        <div className='flex-1'>
          <Title>Dashboard</Title>
        </div>
      </div>
    </main>
  );
}
