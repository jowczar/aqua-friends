import { Inter } from "next/font/google";

import FirebaseProvider from "@/context/FirebaseProvider";
import Navbar from "@/components/Navbar";
import "../globals.css";

const font = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Aqua Friends",
  description: "Monitor your aquariums with ease",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-background`}>
        <FirebaseProvider>
          <Navbar />
          {children}
        </FirebaseProvider>
      </body>
    </html>
  );
}
