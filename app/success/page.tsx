export default function Success() {
  return (
    <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-indigo-600">Sucesso!</h2>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Seu relatório foi enviado com sucesso!
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
          Agora aguarde a resposta de um dos nossos funcionários e resolveremos
          isso o mais rápido possível.
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
