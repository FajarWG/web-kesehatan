'use client';

import React, { useEffect } from 'react';
import Select from 'react-select';
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Button,
  NumberInput
} from '@tremor/react';

export default function AddTable({
  data,
  namaObat,
  setModal,
  searchDate,
  setTambahData
}: {
  data: any;
  namaObat: any;
  setModal: any;
  searchDate: any;
  setTambahData: any;
}) {
  const [dataObat, setDataObat] = React.useState<any>(data);
  const [namaObats, setNamaObats] = React.useState<any>([
    {
      nama_obat: 'ADS 0,3 ml'
    },
    {
      nama_obat: 'ADS 3ml'
    },
    {
      nama_obat: 'Alat Suntik Sekali Pakai 10ml'
    }
  ]);

  const [namaObatDump, setNamaObatDump] = React.useState<any>(namaObat);

  const onAddData = () => {
    setDataObat([
      ...dataObat,
      {
        nama_obat: '',
        pemakaian: 0,
        penerimaan: 0,
        sisa_stok: 0,
        stok_awal: 0,
        jumlah_stok: 0,
        bulan: searchDate === '' ? 0 : parseInt(searchDate.split('-')[1]),
        tahun: searchDate === '' ? 0 : parseInt(searchDate.split('-')[0])
      }
    ]);
  };

  const handleInputChange = (index: any, field: any, value: any) => {
    const newData = [...dataObat];
    if (field === 'nama_obat') {
      newData[index][field] = value.nama_obat;
    } else {
      newData[index][field] = value;
    }
    setDataObat(newData);
  };

  const filterNamaObat = (value: any) => {
    let filtered = namaObatDump.filter((item: any) =>
      item.nama_obat.toLowerCase().includes(value.toLowerCase())
    );
    filtered = filtered.slice(0, 10);
    setNamaObats(filtered);
  };

  useEffect(() => {
    const [year, month] = searchDate.split('-');
    if (year === undefined || month === undefined) return;
    console.log(year, month);
    setDataObat(
      dataObat.map((item: any) => {
        return {
          ...item,
          bulan: parseInt(month),
          tahun: parseInt(year)
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDate]);

  useEffect(() => {
    setNamaObatDump(namaObat);
    setNamaObats(namaObat.slice(0, 10));
  }, [namaObat]);

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>No</TableHeaderCell>
            <TableHeaderCell>Nama Obat</TableHeaderCell>
            <TableHeaderCell>Stok Awal</TableHeaderCell>
            <TableHeaderCell>Pemakaian</TableHeaderCell>
            <TableHeaderCell>Penerimaan</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataObat.map((user: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="relative">
                <Select
                  options={namaObats}
                  onChange={(value) =>
                    handleInputChange(index, 'nama_obat', value)
                  }
                  getOptionLabel={(option: any) => option.nama_obat}
                  getOptionValue={(option: any) => option.nama_obat}
                  placeholder="Masukkan Nama Obat"
                  onInputChange={(value) => filterNamaObat(value)}
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  className=""
                  placeholder="Masukkan Jumlah Stok Awal"
                  onValueChange={(value) =>
                    handleInputChange(index, 'stok_awal', value)
                  }
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  className=""
                  placeholder="Masukkan Jumlah Pemakaian"
                  onValueChange={(value) =>
                    handleInputChange(index, 'pemakaian', value)
                  }
                />
              </TableCell>
              <TableCell>
                <NumberInput
                  className=""
                  placeholder="Masukkan Jumlah Penerimaan"
                  onValueChange={(value) =>
                    handleInputChange(index, 'penerimaan', value)
                  }
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-row justify-end gap-5 mt-5">
        <Button onClick={onAddData}>
          <PlusCircleIcon className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => {
            setTambahData(dataObat);
          }}
        >
          Simpan Data
        </Button>
      </div>
    </>
  );
}
