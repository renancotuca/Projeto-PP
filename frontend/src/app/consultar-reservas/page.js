"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ConsultarReservas() {
  const [reservas, setReservas] = useState([]);
  const [filtroData, setFiltroData] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroRecurso, setFiltroRecurso] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/reservas")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Erro ao buscar reservas");
        }
        return res.json();
      })
      .then((dados) => setReservas(dados))
      .catch((erro) => console.log(erro));
  }, []);

  function formatarData(data) {
    if (!data) return "";

    const dataFormatada = String(data).slice(0, 10);
    const partes = dataFormatada.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  }

  function formatarHora(hora) {
    if (!hora) return "";

    const data = new Date(hora);

    return data.toISOString().slice(11, 16);
  }

  function limparFiltros() {
    setFiltroData("");
    setFiltroUsuario("");
    setFiltroRecurso("");
  }

  const usuarios = [...new Set(reservas.map((r) => r.usuario).filter(Boolean))];
  const recursos = [...new Set(reservas.map((r) => r.recurso).filter(Boolean))];

  const reservasFiltradas = reservas.filter((r) => {
    if (
      filtroData &&
      String(r.data_inicial).slice(0, 10) !== filtroData
    ) {
      return false;
    }

    if (filtroUsuario && r.usuario !== filtroUsuario) {
      return false;
    }

    if (filtroRecurso && r.recurso !== filtroRecurso) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="flex justify-between bg-slate-700 text-white px-4 py-4">
        <h1 className="font-bold text-lg">Sistema de Reservas</h1>

        <nav className="flex gap-6">
          <Link href="/">Página inicial</Link>
          <Link href="/reservas">Fazer reserva</Link>
          <Link href="/consultar-reservas">Consultar reservas</Link>
        </nav>
      </header>

      <main className="flex justify-center mt-10 px-4">
        <div className="bg-white border border-gray-300 p-6 w-full max-w-4xl">
          <h2 className="font-bold text-lg mb-4">Consultar reservas</h2>

          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <label>Data</label>
              <input
                type="date"
                className="w-full border border-gray-300 p-2"
                value={filtroData}
                onChange={(e) => setFiltroData(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label>Usuário</label>
              <select
                className="w-full border border-gray-300 p-2"
                value={filtroUsuario}
                onChange={(e) => setFiltroUsuario(e.target.value)}
              >
                <option value="">Todos</option>
                {usuarios.map((usuario) => (
                  <option key={usuario} value={usuario}>
                    {usuario}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label>Laboratório ou sala</label>
              <select
                className="w-full border border-gray-300 p-2"
                value={filtroRecurso}
                onChange={(e) => setFiltroRecurso(e.target.value)}
              >
                <option value="">Todos</option>
                {recursos.map((recurso) => (
                  <option key={recurso} value={recurso}>
                    {recurso}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={limparFiltros}
            className="border border-gray-300 hover:bg-gray-100 px-4 py-2 mb-4"
          >
            Limpar filtros
          </button>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-200">
                <tr>
                  <th className="border border-gray-300 p-2">Recurso</th>
                  <th className="border border-gray-300 p-2">Data</th>
                  <th className="border border-gray-300 p-2">Horário</th>
                  <th className="border border-gray-300 p-2">Usuário</th>
                  <th className="border border-gray-300 p-2">Status</th>
                </tr>
              </thead>

              <tbody>
                {reservasFiltradas.map((r) => (
                  <tr key={r.id}>
                    <td className="border border-gray-300 p-2">
                      {r.recurso || "Não informado"}
                    </td>

                    <td className="border border-gray-300 p-2">
                      {formatarData(r.data_inicial)}
                    </td>

                    <td className="border border-gray-300 p-2">
                      {formatarHora(r.hora_inicial)} -{" "}
                      {formatarHora(r.hora_final)}
                    </td>

                    <td className="border border-gray-300 p-2">
                      {r.usuario || "Não informado"}
                    </td>

                    <td className="border border-gray-300 p-2">
                      {r.status || "Não informado"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reservasFiltradas.length === 0 && (
            <p className="mt-4">Nenhuma reserva encontrada.</p>
          )}
        </div>
      </main>
    </div>
  );
}
