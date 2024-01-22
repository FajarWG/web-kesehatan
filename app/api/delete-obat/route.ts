import { prisma } from '../../../lib/prisma';
import { NextResponse } from 'next/server';

  export async function POST(request: Request) {
    const body = await request.json();
    const { id } = body;
  
    const user = await prisma.laporanTransaksi.delete({
      where: {
        id: id,
      },
    });
  
    return NextResponse.json(user);
  }
  