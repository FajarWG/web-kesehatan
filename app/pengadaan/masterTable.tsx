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
  stok_awal: number;
  id: number;
  nama_obat: string;
  pemakaian: string;
  penerimaan: string;
  sisa_stok: number;
  bulan: number;
  tahun: number;
}

export default function MasterTable({
  data,
  setModal
}: {
  data: DataMaster[];
  setModal: any;
}) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>No</TableHeaderCell>
          <TableHeaderCell>Nama Obat</TableHeaderCell>
          <TableHeaderCell>Stok Awal</TableHeaderCell>
          <TableHeaderCell>Pemakaian</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.nama_obat}</TableCell>
            <TableCell>
              <Text>{user.stok_awal}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.pemakaian}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
