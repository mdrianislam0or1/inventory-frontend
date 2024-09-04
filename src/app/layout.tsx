import Providers from "@/lib/Providers/Providers";
import { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: 'The-Missing-Place',
  description: "invetory soft management system "
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <Providers>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </Providers>
  )
}
