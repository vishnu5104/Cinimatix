import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import Web3ModalProvider from "@/context/Web3ModelProvider";
import SessionWrapper from "@/components/SessionWrapper";
import { wagmiConfig } from "@blockchain/config/index";
import { cookieToInitialState } from "wagmi";

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
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get("cookie")
  );

  return (
    <SessionWrapper>
      <html lang="en">
        <body
          className={`${inter.className} flex flex-col items-start justify-start box-border leading-[normal] tracking-[normal]`}
        >
          <div className="w-[901px] [filter:blur(600px)] rounded-[50%] [background:linear-gradient(180deg,_#7631ba,_rgba(137,_78,_196,_0))]" />
          <Web3ModalProvider initialState={initialState}>
            {children}
          </Web3ModalProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
