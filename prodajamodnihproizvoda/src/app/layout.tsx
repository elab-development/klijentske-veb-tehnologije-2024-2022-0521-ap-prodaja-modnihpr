import type { Metadata } from "next";
import "./css/globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-bodyFont w-full  bg-main-bg text-darkText">
        <Header />
        {children}
      </body>
    </html>
  );
}
