// app/layout.tsx or app/page.tsx (depending on your Next.js version)
// import localFont from "next/font/local";
import "./globals.css";

import { Noto_Nastaliq_Urdu } from 'next/font/google';

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  variable: '--font-noto-nastaliq',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" >
      
      <body className={notoNastaliq.variable}>{children}</body>
    </html>
  );
}


