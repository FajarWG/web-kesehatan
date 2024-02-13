'use client';

import React, { useState, useEffect, Fragment } from 'react';
import { Card, Metric, Button } from '@tremor/react';
import { Dialog, Transition } from '@headlessui/react';
import AddTable from '../addTable';
import CreatableSelect from 'react-select/creatable';

interface DataMaster {
  id: number;
  nama_obat: string;
  pemakaian: string;
  penerimaan: string;
  sisa_stok: number;
  bulan: number;
  tahun: number;
}

export default function IndexPage() {
  const [data, setData] = useState<any>([
    {
      nama_obat: '',
      pemakaian: 0,
      penerimaan: 0,
      sisa_stok: 0,
      stok_awal: 0,
      jumlah_stok: 0,
      bulan: 0,
      tahun: 0
    }
  ]);
  const [namaObat, setNamaObat] = useState<any>([]);
  let [isOpen, setIsOpen] = useState(false);
  const [btnSubmit, setBtnSubmit] = useState(true);
  const [searchDate, setSearchDate] = useState<string>('');

  const onSubmit = async () => {
    setBtnSubmit(true);
    await fetch('/api/add-obat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data })
    });

    setIsOpen(true);
  };

  useEffect(() => {
    setBtnSubmit(false);
    if (data[0].bulan == 0) {
      setBtnSubmit(true);
    }
  }, [data]);

  useEffect(() => {
    fetch('/api/nama-obat')
      .then((res) => res.json())
      .then((res) => {
        setNamaObat(res);
      });
  }, []);

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl flex flex-col">
      <Metric>Tambahkan Data Obat dan Alat Kesehatan </Metric>
      <div className="flex items-center justify-between mt-3">
        <div className="flex flex-row items-end gap-5">
          <input
            type="month"
            className="h-10 block rounded-md border border-gray-200 px-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search by name..."
            spellCheck={false}
            onChange={(e) => setSearchDate(e.target.value)}
          />
        </div>
      </div>
      <Card className="mt-3">
        <AddTable
          data={data}
          namaObat={namaObat}
          setModal={setIsOpen}
          searchDate={searchDate}
          setTambahData={setData}
        />
      </Card>
      <Button className="ml-auto mt-4" disabled={btnSubmit} onClick={onSubmit}>
        Tambah Data
      </Button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
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
                      Data berhasil ditambahkan
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false);
                        window.location.href = '/data-master/';
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
