export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-900 px-8 py-5 text-white">
        <h1 className="text-2xl font-bold">
          Sistema de Reservas
        </h1>
        <p className="mt-1 text-sm text-blue-200">
          Reserva de laboratórios e salas de aula
        </p>
      </header>

      <div className="flex min-h-[calc(100vh-100px)]">
        <aside className="w-64 bg-white p-6 shadow-md">
          <h2 className="mb-6 text-lg font-semibold text-gray-800">
            Menu
          </h2>

          <nav className="flex flex-col gap-3">
            <a
              href="/"
              className="rounded-lg bg-blue-100 px-4 py-3 font-medium text-blue-900"
            >
              Página inicial
            </a>

            <a
              href="/reservas"
              className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              Reservas
            </a>

            <a
              href="/consultar-reservas"
              className="rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
            >
              Consultar reservas
            </a>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Bem-vindo!
          </h2>

          <p className="mt-2 text-gray-600">
            Escolha uma opção do menu para começar.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <a
              href="/reservas"
              className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-blue-900">
                Fazer reserva
              </h3>
              <p className="mt-3 text-gray-600">
                Cadastre uma reserva de laboratório ou sala de aula.
              </p>
              <span className="mt-5 inline-block font-semibold text-blue-700">
                Acessar →
              </span>
            </a>

            <a
              href="/consultar-reservas"
              className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
            >
              <h3 className="text-xl font-bold text-blue-900">
                Consultar reservas
              </h3>
              <p className="mt-3 text-gray-600">
                Consulte as reservas por data, usuário ou recurso.
              </p>
              <span className="mt-5 inline-block font-semibold text-blue-700">
                Acessar →
              </span>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
