'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Card, Metric, Button, Title, Text } from '@tremor/react';
import { Dialog, Transition } from '@headlessui/react';

import MasterTable from './masterTable';
import Link from 'next/link';

interface DataMaster {
  id: number;
  nama_obat: string;
  pemakaian: string;
  penerimaan: string;
  stok_awal: number;
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
  const [dataPrediksi, setDataPrediksi] = useState<DataMaster[]>([]);
  let [isOpen, setIsOpen] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrediksi = async () => {
    setIsLoading(true);
    setIsOpen(true);

    try {
      await fetch(`/api/prediksi-obat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPrediksi)
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch(`api/get-obat?search=${search}&searchDate=${searchDate}`)
      .then((res) => res.json())
      .then((data) => {
        setDataPrediksi(data);
        data = data.slice(0, 10);
        setData(data);
        setDeleted(false);
      });
  }, [search, searchDate, deleted]);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Metric>Pengadaan</Metric>
      <Title className="text-center my-10 text-lg font-light">
        Lakukan Pengadaan Untuk Bulan Selanjutnya
      </Title>
      <div className="flex items-center justify-between mt-4">
        <div className="flex flex-row items-end gap-5">
          <input
            type="month"
            className="h-10 block rounded-md border border-gray-200 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            spellCheck={false}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
        <Button disabled={searchDate ? false : true} onClick={handlePrediksi}>
          Prediksi Pengadaan
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
            // setIsOpen(false);
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
                    Prediksi Pengadaan
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      {isLoading
                        ? 'Sedang melakukan perhitungan prediksi, mohon ditunggu'
                        : 'Data obat berhasil diprediksi, silahkan tutup dan lihat hasilnya di tabel pengadaan.'}
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      loading={isLoading}
                    >
                      {isLoading ? (
                        'Proses Prediksi...'
                      ) : (
                        <Link href="/pengadaan">Tutup</Link>
                      )}
                    </Button>
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
