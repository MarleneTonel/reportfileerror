"use client";

import PocketBase from "pocketbase";
import Link from "next/link";
import React, { ReactNode, useState, useEffect } from "react";
import "../styles/globals.css";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import XMarkIcon from "@heroicons/react/24/solid/XMarkIcon";
import { Dialog } from "@headlessui/react";
import { useRouter, usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pb = new PocketBase("http://127.0.0.1:8090");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setIsClient] = useState(false);
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    setIsClient(pb.authStore.isValid);
    
    if(!pb.authStore.isValid && pathName === "/reports") {
      router.push("/");
    }
  }, []);

  function logout() {
    pb.authStore.clear();
    window.location.reload();
  }

  return (
    <html>
      <body>
        <main className="antialiased">
          <header>
            <nav className="bg-white dark:bg-gray-800 h-14 flex items-center justify-between mb-4 shadow">
              <div className="flex lg:flex-1">
                <Link
                  href="/"
                  className="sm:text-lg font-semibold px-4 sm:px-6 lg:px-8"
                >
                  iDocumentos
                </Link>
              </div>
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md px-4 sm:px-6 lg:px-8 text-gray-700 dark:text-gray-200"
                  onClick={() => setMobileMenuOpen(true)}
                >
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="hidden lg:flex lg:gap-x-12">
                {user ? (
                  <Link href="/reports" className="btn">
                    Relatórios
                  </Link>
                ) : (
                  <></>
                )}
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:justify-end px-4 sm:px-6 lg:px-8">
                {user ? (
                  <button onClick={logout} className="btn">
                    Sair
                  </button>
                ) : (
                  <Link href="/login" className="btn btn-primary">
                    Entrar
                  </Link>
                )}
              </div>
            </nav>

            <Dialog
              as="div"
              className="lg:hidden"
              open={mobileMenuOpen}
              onClose={setMobileMenuOpen}
            >
              <Dialog.Panel className="absolute inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-800 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div className="flex items-center justify-between">
                  <Link href="/" className="text-lg font-semibold -m-1.5 p-1.5">
                    iDocumentos
                  </Link>
                  <button
                    type="button"
                    className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-6 flow-root">
                  {pb.authStore.isValid ? (
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        <Link href="/reports" className="btn text-base">
                          Relatórios
                        </Link>
                      </div>
                      <div className="py-6">
                        <button onClick={logout} className="btn">
                          Sair
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="py-6">
                        <Link href="/login" className="btn">
                          Entrar
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Dialog>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
