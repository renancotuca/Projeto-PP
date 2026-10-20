
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-red-800 px-4 py-3">
        <nav className="flex flex-wrap justify-center gap-2">
          <a
            href="/"
            className="rounded px-5 py-2 font-medium text-white hover:bg-red-900"
          >
            Página inicial
          </a>

          <a
            href="/reservas"
            className="rounded px-5 py-2 text-white hover:bg-red-900"
          >
            Fazer reserva
          </a>

          <a
            href="/consultar-reservas"
            className="rounded px-5 py-2 text-white hover:bg-red-900"
          >
            Consultar reservas
          </a>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-800">
          Bem-vindo ao Sistema de Reservas
        </h1>

        <p className="mt-4 text-lg text-gray-600">
          Utilize o menu acima para realizar e consultar reservas de
          laboratórios e salas de aula.
        </p>

        <div className="mt-8 rounded-md bg-white p-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Sobre o sistema
          </h2>

          <p className="mt-3 leading-7 text-gray-600">
            Este sistema permite realizar reservas de recursos,
            consultar horários e visualizar as reservas cadastradas.
            O objetivo é facilitar a organização e o controle da
            utilização dos laboratórios e das salas de aula.
          </p>
        </div>
      </main>
    </div>
  );
}
