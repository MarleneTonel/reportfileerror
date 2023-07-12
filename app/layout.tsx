// import { useAuth } from "@/hooks/auth";
import Link from "next/link";
import React from "react";
import "../styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { user } = useAuth({ middleware: "guest" });

  return (
    <html>
      <body>
        <main className="antialiased">
          <nav className="bg-gray-800 h-14 flex items-center mb-4">
            <Link
              href="/"
              className="sm:text-lg font-semibold mx-auto px-4 sm:px-6 lg:px-8"
            >
              iDocumentos
            </Link>

            <span className="flex-1"></span>

            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <Link href="/login" className="btn btn-primary">
                Entrar
              </Link>

              <Link href="/register" className="ml-4 btn btn-outlined">
                Cadastrar
              </Link>
              <Link href="/reports" className="ml-4 btn btn-primary">
                Dashboard
              </Link>
              {/* {user ? (
                <Link href="/dashboard" className="btn btn-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                </>
              )} */}
            </div>
          </nav>
          <div className="p-2">{children}</div>
        </main>
      </body>
    </html>
  );
}
