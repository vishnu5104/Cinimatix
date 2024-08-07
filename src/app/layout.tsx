import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers'
import Web3ModalProvider from "@/context/Web3ModelProvider";

import { wagmiConfig} from '@/blockchain/config/index'
import { cookieToInitialState } from 'wagmi'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinimatix",
  description: "Defi Powered Project",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(wagmiConfig, headers().get('cookie'))

  return (

    <html lang="en">
    <body className={`${inter.className} w-full relative overflow-hidden flex flex-col items-start justify-start pt-[60px] px-[220px] pb-[585px] box-border leading-[normal] tracking-[normal] mq750:pl-[55px] mq750:pr-[55px] mq750:box-border mq1050:pl-[110px] mq1050:pr-[110px] mq1050:box-border`}>
      <div className="w-[901px] h-[720px] absolute !m-[0] top-[-482px] left-[21px] [filter:blur(600px)] rounded-[50%] [background:linear-gradient(180deg,_#7631ba,_rgba(137,_78,_196,_0))]" />
      <Web3ModalProvider initialState={initialState}>{children}</Web3ModalProvider>
    </body>
  </html>

  );
}
