import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from './db';
import { authConfig } from './auth.config';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize({ username, password }: any) {
        let user = await getUser(username);
        if (!user) return null;
        let passwordsMatch = await compare(password, user.password!);
        if (!passwordsMatch) return null

        return await{
          id: user.id,
          name: user.username,
          username: user.username,
        }
      },
    }),
  ],
});
