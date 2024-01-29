'use client';

import React from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import {
    Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Text
  } from '@tremor/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
  
  interface DataMaster {
    id: number;
    nama_obat: string;
    pemakaian: string;
    penerimaan: string;
    sisa_stok: number;
    bulan: number;
    tahun: number;
  }
  
  export default function MasterTable({ data, setModal }: { data: DataMaster[], setModal: any }) {

  async function deleteData(id: string) {
    await fetch('/api/delete-obat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
  }

    return (
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
          {data.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{user.nama_obat}</TableCell>
              <TableCell>
                <Text>{user.pemakaian}</Text>
              </TableCell>
              <TableCell>
                <Text>{user.penerimaan}</Text>
              </TableCell>
              <TableCell>
                <Text>{user.sisa_stok}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    );
  }
  