
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-800 px-8 py-5 text-center text-white">
        <h1 className="text-2xl font-bold">
          Sistema de Reservas
        </h1>

        <p className="mt-1 text-sm text-red-100">
          Laboratórios e salas de aula
        </p>
      </header>

      <div className="flex min-h-[calc(100vh-100px)]">
        <aside className="w-64 border-r border-gray-200 bg-white p-6">
          <h2 className="mb-5 text-lg font-semibold text-gray-800">
            Menu
          </h2>

          <nav className="flex flex-col gap-2">
            <a
              href="/"
              className="rounded-md bg-red-50 px-4 py-3 font-medium text-red-800"
            >
              Página inicial
            </a>

            <a
              href="/reservas"
              className="rounded-md px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              Fazer reserva
            </a>

            <a
              href="/consultar-reservas"
              className="rounded-md px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              Consultar reservas
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Página inicial
          </h2>

          <p className="mt-2 text-gray-600">
            Selecione uma opção para continuar.
          </p>

          <div className="mt-7 grid gap-5 md:grid-cols-2">
            <a
              href="/reservas"
              className="rounded-lg border border-gray-200 bg-white p-6 hover:border-red-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Fazer reserva
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Cadastrar uma reserva de laboratório ou sala de aula.
              </p>

              <p className="mt-5 text-sm font-semibold text-red-800">
                Acessar página →
              </p>
            </a>

            <a
              href="/consultar-reservas"
              className="rounded-lg border border-gray-200 bg-white p-6 hover:border-red-300"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                Consultar reservas
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Buscar reservas por data, usuário ou recurso.
              </p>

              <p className="mt-5 text-sm font-semibold text-red-800">
                Acessar página →
              </p>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
