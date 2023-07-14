"use client";

export default function Error() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-blue-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Página não encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
          Desculpe, não encontramos a página que você buscava.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a href="/" className="btn btn-primary">
            Voltar para a página inicial
          </a>
        </div>
      </div>
    </main>
  );
}
