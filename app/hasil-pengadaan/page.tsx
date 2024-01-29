
import { Metric, Button, DateRangePicker } from '@tremor/react';

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Metric>Hasil Pengadaan</Metric>
    </main>
  );
}
