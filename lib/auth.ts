import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare, hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { db } from "./db";
import { users } from "./schema";

export const authOptions = {
  pages: {
    newUser: "/login",
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where(fields, operators) {
            return operators.eq(fields.email, credentials.email as string);
          },
        });

        if (!user) {
          const id = uuid();

          await db.insert(users).values({
            id,
            email: credentials.email as string,
            passwordHash: await hash(credentials.password as string, 10),
          });

          return {
            id,
            email: credentials.email as string,
          };
        }

        const isValid = await compare(
          credentials.password as string,
          user.passwordHash as string
        );

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
