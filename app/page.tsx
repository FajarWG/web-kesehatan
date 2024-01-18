import { Title, Text, Metric } from '@tremor/react';

export default async function IndexPage(){

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Metric>Selamat Datang</Metric>
      <Text>Di Sistem Pengadaan Obat Puskesmas Bagendit</Text>
    </main>
  );
}
