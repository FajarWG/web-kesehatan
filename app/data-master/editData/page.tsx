"use client";

import { SubmitButton } from '../../components/submit-button';
import { Dialog, Transition } from '@headlessui/react'
import React,{useState, useEffect, Fragment} from 'react';



export default function UpdateData(
  {
    searchParams
  }: {
    searchParams: { id: string };
  }
) {

  const byId = searchParams.id ?? '';

  const [data, setData] = React.useState<any>({});
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: any) => {
    setLoading(true)

    e.preventDefault();
    const formData = new FormData(e.target);
    const body = Object.fromEntries(formData);
    body.id = byId;
    body.bulan = data.bulan;
    body.tahun = data.tahun;
    body.jumlah_stok = data.jumlah_stok;
    body.stok_awal = data.stok_awal;


    await fetch('/api/update-obat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

  }


  useEffect(() => {
    fetch(`/api/get-obat?id=${byId}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
      });

  }, [byId]);


  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Edit Data Obat & Alat</h3>
          <p className="text-sm text-gray-500">
            Masukkan data obat dan alat kesehatan yang baru
          </p>
        </div>
        <form
      onSubmit={onSubmit}
      className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 sm:px-16"
    >
      <div>
        <label
          htmlFor="nama_obat"
          className="block text-xs text-gray-600 uppercase"
        >
          Nama Obat
        </label>
        <input
          id="nama_obat"
          name="nama_obat"
          type="text"
          placeholder="nama obat"
          defaultValue={data.nama_obat}
          autoComplete="nama_obat"
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="pemakaian"
          className="block text-xs text-gray-600 uppercase"
        >
          Pemakaian
        </label>
        <input
          id="pemakaian"
          name="pemakaian"
          type="number"
          placeholder="pemakaian"
          autoComplete="pemakaian"
          defaultValue={data.pemakaian}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="penerimaan"
          className="block text-xs text-gray-600 uppercase"
        >
          Penerimaan
        </label>
        <input
          id="penerimaan"
          name="penerimaan"
          type="number"
          placeholder="penerimaan"
          autoComplete="penerimaan"
          defaultValue={data.penerimaan}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>
      <div>
        <label
          htmlFor="sisa_stok"
          className="block text-xs text-gray-600 uppercase"
        >
          Sisa Stok
        </label>
        <input
          id="sisa_stok"
          name="sisa_stok"
          type="number"
          placeholder="sisa stok"
          autoComplete="sisa_stok"
          defaultValue={data.sisa_stok}
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <SubmitButton onClick={()=>setIsOpen(true)} disabled={loading}>Edit Data</SubmitButton>
        </form> 
        <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={()=> {
          setIsOpen(false)
          setLoading(false)
        } }>
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
                      Data berhasil diubah
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        setIsOpen(false)
                        setLoading(false)
                        window.location.href = '/data-master/'
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
      </div>
    </div>
  );
}
