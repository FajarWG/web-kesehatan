import { sql } from '@vercel/postgres';
import { Card, Metric, Button, DateRangePicker } from '@tremor/react';

import UsersTable from '../table';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export default async function IndexPage({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const result = await sql`
    SELECT id, name, username, email 
    FROM users 
    WHERE name ILIKE ${'%' + search + '%'};
  `;
  const users = result.rows as User[];

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Metric>Masukkan Data Transaksi Bulanan</Metric>
      <div className="flex items-center justify-between mt-4">
        <DateRangePicker enableSelect={false} />
        <Button>Pengadaan</Button>
      </div>
      <Card className="mt-6">
        <UsersTable users={users} />
      </Card>
    </main>
  );
}
