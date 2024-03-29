import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import Nav from './components/nav';
import { Suspense } from 'react';
import { auth } from './lib/auth';
import { Toaster } from "sonner";

export const metadata = {
  title: 'Web Kesehatan',
  description:
    'A user admin dashboard configured with Next.js, Postgres, NextAuth, Tailwind CSS, TypeScript, ESLint, and Prettier.'
};

const navigationPegawai = [
  { name: 'Beranda', href: '/' },
  { name: 'Data Obat', href: '/data-master' },
  { name: 'Pengadaan', href: '/pengadaan' },
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

  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Toaster richColors />
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
