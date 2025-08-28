import type { Metadata } from "next";
import "@ant-design/v5-patch-for-react-19";

import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import TanstackQuery from "@providers/TanstackQuery";
import { ThemeProvider } from "@providers/ThemeProvider";
import ApolloClientProvider from "@providers/ApolloClientProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "IOT",
  description: "IOT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <TanstackQuery>
            <ApolloClientProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </ApolloClientProvider>
          </TanstackQuery>
        </AntdRegistry>
      </body>
    </html>
  );
}
