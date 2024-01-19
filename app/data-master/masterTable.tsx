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
    pemakaian: string;
    penerimaan: string;
    sisa_stok: number;
    bulan: number;
    tahun: number;
  }
  
  export default function MasterTable({ data }: { data: DataMaster[] }) {
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Nama Obat</TableHeaderCell>
            <TableHeaderCell>Pemakaian</TableHeaderCell>
            <TableHeaderCell>Penerimaan</TableHeaderCell>
            <TableHeaderCell>Sisa Stok</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id}>
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
  