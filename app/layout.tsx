import type { Metadata } from "next";
import "modern-normalize/modern-normalize.css";
import "./globals.css";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "@/components/ToastProvider/ToastProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          <Footer />
        </TanStackProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
