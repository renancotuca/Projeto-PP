"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./style.css";

export default function Home() {
  const router = useRouter();
  const [autorizado, setAutorizado] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const dadosUsuario = sessionStorage.getItem("usuario");

    if (!token) {
      router.replace("/login");
      return;
    }

    if (dadosUsuario) {
      try {
        setUsuario(JSON.parse(dadosUsuario));
      } catch {
        sessionStorage.removeItem("usuario");
      }
    }

    setAutorizado(true);
  }, [router]);

  function sair() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("usuario");
    router.replace("/login");
  }

  if (!autorizado) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-gray-700 px-6 py-3">
        <nav className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-xl font-bold text-white">
            Sistema de Reservas
          </span>

          <div className="flex flex-wrap items-center justify-end gap-5">
            <Link href="/" className="text-white hover:underline">
              Página inicial
            </Link>

            <Link href="/reservas" className="text-white hover:underline">
              Fazer reserva
            </Link>

            <Link
              href="/consultar-reservas"
              className="text-white hover:underline"
            >
              Consultar reservas
            </Link>

            <button onClick={sair} className="botao-sair">
              Sair
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-5xl">
          <p className="mensagem-boas-vindas">
            {usuario
              ? `Olá, ${usuario.nome_completo}!`
              : "Bem-vindo ao Sistema de Reservas."}
          </p>

          <p className="mb-8 text-gray-600">
            Escolha uma das opções abaixo para continuar.
          </p>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Link
              href="/reservas"
              className="rounded-md bg-white p-6 shadow-sm"
            >
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                Fazer reserva
              </h2>
              <p className="text-gray-600">
                Reserve um laboratório ou uma sala.
              </p>
            </Link>

            <Link
              href="/consultar-reservas"
              className="rounded-md bg-white p-6 shadow-sm"
            >
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                Consultar reservas
              </h2>
              <p className="text-gray-600">
                Consulte as reservas cadastradas no sistema.
              </p>
            </Link>

            <Link
              href="/cadastrar-recursos"
              className="rounded-md bg-white p-6 shadow-sm"
            >
              <h2 className="mb-2 text-xl font-semibold text-gray-800">
                Cadastrar recursos
              </h2>
              <p className="text-gray-600">
                Cadastre e gerencie laboratórios e salas.
              </p>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}