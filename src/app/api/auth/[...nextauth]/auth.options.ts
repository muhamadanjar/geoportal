import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { pagesOptions } from "./page.options";
import isEqual from "lodash/isEqual";
import axios from "axios";
import { NextResponse } from "next/server";

export const authOptions: NextAuthOptions = {
  // debug: true,
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async session({ session, token }) {
      console.log("callback session", session, token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.idToken as string,
        },
      };
    },
    async jwt({ token, user }) {
      console.log("callback jwt", token, user);
      if (user) {
        // return user as JWT
        token.user = user;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log("call redirect next auth");
      const parsedUrl = new URL(url, baseUrl);
      if (parsedUrl.searchParams.has("callbackUrl")) {
        return `${baseUrl}${parsedUrl.searchParams.get("callbackUrl")}`;
      }
      if (parsedUrl.origin === baseUrl) {
        return url;
      }
      return baseUrl;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: {
          label: "username:",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials: any) {
        console.log("credential data", credentials);
        try {
          let res = await axios.post(`${process.env.NEXTAUTH_URL}/api/token/`, {
            username: credentials.username,
            password: credentials.password,
          });

          console.log(res.data);
          const response = NextResponse.next();

          response.cookies.set("token", res.data.access);
        } catch (error) {
          console.error(error);
        }
        return null;
      },
    }),
  ],
};
