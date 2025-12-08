"use client";

// import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BotonesAuth from "@/components/BotonesAuth";
import PieDePagina from "@/components/PieDePagina";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-white m-0 p-0 w-full`}
      >
        {/* NAVBAR */}
        <header className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 shadow-sm">
          <nav className="px-4 sm:px-6 lg:px-8 py-5 flex items-center">
            {/* Logo izquierda */}
            <div className="flex-1">
              <Link href="/">
                <Image
                  src="/logo-mvl.png"
                  alt="Vivamos Vicente López"
                  width={150}
                  height={50}
                  className="h-auto"
                />
              </Link>
            </div>

            {/* Menú en el centro */}
            <ul className="flex-1 flex gap-8 items-center justify-center">
              <li>
                <Link
                  href="/"
                  className={`font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ${
                    isActive("/")
                      ? "text-green-700 hover:text-gray-300"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/feria"
                  className={`font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ${
                    isActive("/feria")
                      ? "text-green-700"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Ferias
                </Link>
              </li>
              <li>
                <Link
                  href="/feria/crear"
                  className={`font-semibold text-sm uppercase tracking-wide transition-colors duration-300 ${
                    isActive("/feria/crear")
                      ? "text-green-700"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  Crear
                </Link>
              </li>
            </ul>

            {/* Botones derecha */}
            <div className="flex-1 flex items-center justify-end gap-4">
              <BotonesAuth />
            </div>
          </nav>

          {/* Barra multicolor */}
          <div className="h-1 bg-gradient-to-r from-pink-500 via-green-400 via-teal-500 to-blue-600"></div>
        </header>

        {/* MAIN */}
        <main className="bg-white flex flex-col w-full">{children}</main>

        {/* FOOTER - Solo si NO está en /auth */}
        <PieDePagina />
      </body>
    </html>
  );
}