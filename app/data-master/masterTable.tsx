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

export default function MasterTable({
  data,
  setModal
}: {
  data: DataMaster[];
  setModal: any;
}) {
  const [isLoading, setIsLoading] = React.useState(false);

  async function deleteData(id: string) {
    setIsLoading(true);
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
          <TableHeaderCell>Stok Awal</TableHeaderCell>
          <TableHeaderCell>Pemakaian</TableHeaderCell>
          <TableHeaderCell>Penerimaan</TableHeaderCell>
          <TableHeaderCell>Aksi</TableHeaderCell>
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
            <TableCell>
              <Text>{user.penerimaan}</Text>
            </TableCell>
            <TableCell className="flex gap-2">
              <a href={`/data-master/editData?id=${user.id}`}>
                <PencilIcon className="w-5 h-5 text-gray-500" />
              </a>
              {/* <button
                onClick={() => {
                  deleteData(user.id.toString());
                  setModal(true);
                }}
                disabled={isLoading}
              >
                <TrashIcon className="w-5 h-5 text-gray-500" />
              </button> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
