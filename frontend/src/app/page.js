export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-700 px-6 py-3">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xl font-bold text-white">
            Sistema de Reservas
          </span>

          <div className="flex flex-wrap justify-end gap-2">
            <a
              href="/"
              className="px-4 py-2 font-medium text-white hover:bg-gray-800"
            >
              Página inicial
            </a>

            <a
              href="/reservas"
              className="px-4 py-2 text-white hover:bg-gray-800"
            >
              Fazer reserva
            </a>

            <a
              href="/consultar-reservas"
              className="px-4 py-2 text-white hover:bg-gray-800"
            >
              Consultar reservas
            </a>
          </div>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-8 py-12">

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-md border border-gray-300 bg-white p-8 shadow-[0_2px_2px_rgba(0,0,0,0.10)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_4px_4px_rgba(0,0,0,0.12)]">
            <h2 className="text-xl font-semibold text-gray-800">
              Fazer reserva
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Escolha um laboratório ou sala para reservar.
            </p>

            <a
              href="/reservas"
              className="mt-4 inline-block font-medium text-gray-700 hover:underline"
            >
              Nova reserva
            </a>
          </div>

          <div className="rounded-md border border-gray-300 bg-white p-8 shadow-[0_2px_2px_rgba(0,0,0,0.10)] transition-all duration-200 ease-in-out hover:-translate-y-1 hover:shadow-[0_4px_4px_rgba(0,0,0,0.12)]">
            <h2 className="text-xl font-semibold text-gray-800">
              Consultar reservas
            </h2>

            <p className="mt-4 leading-7 text-gray-600">
              Consulte as reservas feitas.
            </p>

            <a
              href="/consultar-reservas"
              className="mt-4 inline-block font-medium text-gray-700 hover:underline"
            >
              Ver reservas
            </a>
          </div>
        </div>
      </main>

      <footer className="border-t border-gray-300 bg-white px-8 py-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Sobre o sistema
        </h2>

        <p className="mt-3 leading-7 text-gray-600">
          Este sistema permite realizar reservas de recursos e visualizar as reservas feitas.
        </p>
      </footer>
    </div>
  );
}