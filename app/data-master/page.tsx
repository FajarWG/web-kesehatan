'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Card, Metric, Button, Title } from '@tremor/react';
import { Dialog, Transition } from '@headlessui/react';

import Search from '../components/search';
import MasterTable from './masterTable';
import Link from 'next/link';

interface DataMaster {
  id: number;
  nama_obat: string;
  stok_awal: number;
  pemakaian: string;
  penerimaan: string;
  sisa_stok: number;
  bulan: number;
  tahun: number;
}

export default function IndexPage({
  searchParams
}: {
  searchParams: { q: string; id: string };
}) {
  const search = searchParams.q ?? '';
  const [searchDate, setSearchDate] = useState<string>('');

  const [data, setData] = useState<DataMaster[]>([]);
  let [isOpen, setIsOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    fetch(`api/get-obat?search=${search}&searchDate=${searchDate}`)
      .then((res) => res.json())
      .then((data) => {
        data = data.slice(0, 10);
        setData(data);
        setDeleted(false);
      });
  }, [search, searchDate, deleted]);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Metric>Data Obat dan Alat Kesehatan </Metric>
      <div className="flex items-center justify-between">
        <div className="flex flex-row items-end gap-5">
          <input
            type="month"
            className="h-10 block rounded-md border border-gray-200 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            spellCheck={false}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <Search />
        </div>
        <Button>
          <Link href="/data-master/addData">Tambah Data</Link>
        </Button>
      </div>
      <Card className="mt-6">
        <MasterTable data={data} setModal={setIsOpen} />
      </Card>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
            setDeleted(true);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Berhasil
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Data berhasil dihapus
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false);
                        setDeleted(true);
                      }}
                    >
                      Oke
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}
