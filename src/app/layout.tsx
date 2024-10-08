import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/css/globals.css";
import { QueryProvider } from "@/utils/query-providers";
import AuthProvider from "@/utils/auth-providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/auth.options";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Geoportal ",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
      <AuthProvider session={session}>
        <QueryProvider>
          {children}
          <Suspense fallback={null}>
          </Suspense>
        </QueryProvider>
      </AuthProvider>
      </body>
    </html>
  );
}
