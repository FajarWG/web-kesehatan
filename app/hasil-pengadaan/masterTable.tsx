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
  jml_pengadaan: number;
  nilai_rmsp: number;
  nilai_mae: number;
  nilai_rsquare: number;
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
          <TableHeaderCell>Jumlah Pengadaan</TableHeaderCell>
          <TableHeaderCell>Nilai RMSE</TableHeaderCell>
          <TableHeaderCell>Nilai MAE</TableHeaderCell>
          <TableHeaderCell>Nilai R-Square</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{user.nama_obat}</TableCell>
            <TableCell>
              <Text>{user.jml_pengadaan}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.nilai_rmsp.toFixed(1)}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.nilai_mae.toFixed(1)}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.nilai_rsquare.toFixed(1)}</Text>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
