import { sql } from '@vercel/postgres';
import { prisma } from '../lib/prisma';
import { genSaltSync, hashSync } from 'bcrypt-ts';

export async function getUser(username: string) {
  return await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
}

export async function createUser(username: string, password: string) {
  let salt = genSaltSync(10);
  let hash = hashSync(password, salt);

  return await prisma.user.create({
    data: {
      username: username,
      password: hash,
    },
  });
}
