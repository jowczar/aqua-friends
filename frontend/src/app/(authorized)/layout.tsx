import FirebaseProvider from "@/context/FirebaseProvider";
import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
