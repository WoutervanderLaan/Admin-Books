import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import classNames from "classnames";
import { Header } from "../components/Header";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

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
      <body
        className={classNames(
          roboto.className,
          "min-h-screen flex flex-col relative"
        )}
      >
        <Header />

        <main className="relative flex flex-col items-center flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
