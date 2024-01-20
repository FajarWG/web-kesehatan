import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './nav';
import { Suspense } from 'react';
import { auth } from './auth';

export const metadata = {
  title: 'Next.js App Router + NextAuth + Tailwind CSS',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

const navigationPegawai = [
  { name: 'Beranda', href: '/' },
  { name: 'Data Master', href: '/data-master' },
  { name: 'Data Transaksi', href: '/data-transaksi' },
  { name: 'Hasil Pengadaan', href: '/hasil-pengadaan' },
];

const navigationUkp = [
  { name: 'Beranda', href: '/' },
  { name: 'Hasil Pengadaan', href: '/hasil-pengadaan' },
];

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {

  let session = await auth();
  console.log(session?.user?.name);

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        {session && <Suspense>
        {session?.user?.name == 'pegawai' ? (
          <Nav navigation={navigationPegawai} />
        ) : (
          <Nav navigation={navigationUkp} />
        )}
        </Suspense>}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
