import GoogleProvider from 'next-auth/providers/google';
import { NextAuthOptions } from 'next-auth';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  pages: {  
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    redirect({url, baseUrl}) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    session({session, token}) {
      if (session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    jwt({token, user, account, profile}) {
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
  },
  debug: process.env.NODE_ENV === 'development',
};
