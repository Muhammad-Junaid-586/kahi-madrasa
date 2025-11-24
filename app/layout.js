// app/layout.tsx or app/page.tsx (depending on your Next.js version)
// import localFont from "next/font/local";
import { AppContextProvider } from "@/context/AppContext";
import "./globals.css";

import { Noto_Nastaliq_Urdu } from "next/font/google";

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  variable: "--font-noto-nastaliq",
});

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * The root layout component which wraps the entire app.
 * It provides the app context and sets the font family to Noto Nastaliq Urdu.
 *
 * @param {ReactNode} children - The children components to render
 * @returns {ReactElement} The root layout component
 */
/*******  9099578e-3568-489d-bd49-a71d41419e0f  *******/
export default function RootLayout({ children }) {
  return (
    <AppContextProvider>
      
      <html lang="en">
        <body className={notoNastaliq.variable}>{children}</body>
      </html>
    </AppContextProvider>
   

  );
}
