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

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({
  children, modal
}: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
