import Link from 'next/link';
import { SubmitButton } from '../../submit-button';
import { createObat } from '../../db';
import { redirect } from 'next/navigation';


export default function addData() {

  async function updateData(formData: FormData) {
    'use server';
    let nama_obat = formData.get('nama_obat') as string;
    let pemakaian = parseInt(formData.get('pemakaian') as string);
    let penerimaan = parseInt(formData.get('penerimaan') as string)
    let sisa_stok = parseInt(formData.get('sisa_stok') as string)

    // get month and year from date
    let date = new Date();
    let bulan = date.getMonth() + 1;
    let tahun = date.getFullYear();


    await createObat(nama_obat, pemakaian, penerimaan, sisa_stok, bulan, tahun)
    
    redirect('/data-master/')

  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Tambahkan Data Obat & Alat</h3>
          <p className="text-sm text-gray-500">
            Masukkan data obat dan alat kesehatan yang baru
          </p>
        </div>
        <form
      action={updateData}
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
          required
          className="mt-1 block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-black focus:outline-none focus:ring-black sm:text-sm"
        />
      </div>

      <SubmitButton>Add Data</SubmitButton>
    </form>        
      </div>
    </div>
  );
}
