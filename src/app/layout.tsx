import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KeyCipher - ระบบเข้ารหัสความปลอดภัยสูง",
  description: "Key-Derived Config Encryption - ระบบเข้ารหัสข้อความที่ปลอดภัย แต่ละคนมี Config เฉพาะตัว",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
