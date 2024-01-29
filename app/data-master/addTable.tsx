'use client';

import React, { useEffect } from 'react';
import { PencilIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text,
    TextInput,
    Button,
    NumberInput
  } from '@tremor/react';
  
  export default function AddTable({ data, setModal, searchDate, setTambahData }: { data: any, setModal: any, searchDate: any, setTambahData: any }) {

    const [dataObat, setDataObat] = React.useState<any>(data);

    const onAddData = () => {
      setDataObat([...dataObat, {
          nama_obat: '',
          pemakaian: 0,
          penerimaan: 0,
          sisa_stok: 0,
          stok_awal: 0,
          jumlah_stok: 0,
          bulan: searchDate === '' ? 0 : parseInt(searchDate.split('-')[1]),
          tahun: searchDate === '' ? 0 : parseInt(searchDate.split('-')[0]),
      }])
    }

    const handleInputChange = (index: any, field: any, value: any) => {
      const newData = [...dataObat];
      newData[index][field] = value;
      setDataObat(newData);
    };

    useEffect(() => {
        const [year, month] = searchDate.split('-');
        if(year === undefined || month === undefined) return;
        console.log(year, month)
        setDataObat(dataObat.map((item: any) => {
            return {
                ...item,
                bulan: parseInt(month),
                tahun: parseInt(year)
            }
        }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchDate])

    useEffect(() => {
      console.log(dataObat)
    },[dataObat])

    return (
      <>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>No</TableHeaderCell>
            <TableHeaderCell>Nama Obat</TableHeaderCell>
            <TableHeaderCell>Pemakaian</TableHeaderCell>
            <TableHeaderCell>Penerimaan</TableHeaderCell>
            <TableHeaderCell>Sisa Stok</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataObat.map((user: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <TextInput className='' placeholder='Masukkan Nama Obat' 
                  onValueChange={(value) => handleInputChange(index, 'nama_obat', value)}
                />
                </TableCell>
              <TableCell>
                <NumberInput className='' 
                  placeholder='Masukkan Jumlah Pemakaian' 
                  onValueChange={(value) => handleInputChange(index, 'pemakaian', value)}
                />
              </TableCell>
              <TableCell>
                <NumberInput className='' 
                  placeholder='Masukkan Jumlah Penerimaan'
                  onValueChange={(value) => handleInputChange(index, 'penerimaan', value)}
                />
              </TableCell>
              <TableCell>
                <NumberInput className='' 
                placeholder='Masukkan Jumlah Sisa Stok'
                onValueChange={(value) => handleInputChange(index, 'sisa_stok', value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='flex flex-row justify-end gap-5 mt-5'>
        <Button onClick={onAddData}>
          <PlusCircleIcon className='w-5 h-5' />
        </Button>
        <Button onClick={() => {
          setTambahData(dataObat)
        }
        }>
          Simpan Data
        </Button>
      </div>

      </>
    );
  }
  