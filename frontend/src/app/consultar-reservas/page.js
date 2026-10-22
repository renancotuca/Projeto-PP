"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ConsultarReservas() {
  const [reservas, setReservas] = useState([]);
  const [salas, setSalas] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [filtroData, setFiltroData] = useState("");
  const [filtroUsuario, setFiltroUsuario] = useState("");
  const [filtroRecurso, setFiltroRecurso] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/reservas")
      .then((res) => res.json())
      .then((dados) => setReservas(dados))
      .catch((erro) => console.log("Erro ao buscar reservas:", erro));

    fetch("http://localhost:3000/salas")
      .then((res) => res.json())
      .then((dados) => setSalas(dados))
      .catch((erro) => console.log("Erro ao buscar salas:", erro));

    fetch("http://localhost:3000/laboratorios")
      .then((res) => res.json())
      .then((dados) => setLaboratorios(dados))
      .catch((erro) => console.log("Erro ao buscar laboratorios:", erro));

    fetch("http://localhost:3000/usuarios")
      .then((res) => res.json())
      .then((dados) => setUsuarios(dados))
      .catch((erro) => console.log("Erro ao buscar usuarios:", erro));
  }, []);

  function nomeUsuario(id) {
    const u = usuarios.find((u) => u.id == id);
    return u ? u.nome : id;
  }

  function nomeRecurso(tipo, id) {
    if (tipo == "laboratorio") {
      const lab = laboratorios.find((l) => l.id == id);
      return lab ? "Laboratório " + lab.nome : id;
    }
    const sala = salas.find((s) => s.id == id);
    return sala ? "Sala " + sala.nome : id;
  }

  function formatarData(data) {
    const partes = String(data).slice(0, 10).split("-");
    return partes[2] + "/" + partes[1] + "/" + partes[0];
  }

  function limparFiltros() {
    setFiltroData("");
    setFiltroUsuario("");
    setFiltroRecurso("");
  }

  const reservasFiltradas = reservas.filter((r) => {
    if (filtroData && String(r.data).slice(0, 10) != filtroData) {
      return false;
    }
    if (filtroUsuario && r.idUsuario != filtroUsuario) {
      return false;
    }
    if (filtroRecurso && r.tipo + "-" + r.idRecurso != filtroRecurso) {
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

      <main className="flex justify-center mt-10">
        <div className="bg-white border border-gray-300 p-6 w-full max-w-4xl">
          <h2 className="font-bold text-lg mb-4">Consultar reservas</h2>

          <div className="flex gap-4 mb-4">
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
                {usuarios.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome}
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
                {laboratorios.map((lab) => (
                  <option key={"laboratorio-" + lab.id} value={"laboratorio-" + lab.id}>
                    Laboratório {lab.nome}
                  </option>
                ))}
                {salas.map((sala) => (
                  <option key={"sala-" + sala.id} value={"sala-" + sala.id}>
                    Sala {sala.nome}
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

          <table className="w-full border border-gray-300 text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 p-2">Recurso</th>
                <th className="border border-gray-300 p-2">Data</th>
                <th className="border border-gray-300 p-2">Horário</th>
                <th className="border border-gray-300 p-2">Usuário</th>
              </tr>
            </thead>
            <tbody>
              {reservasFiltradas.map((r, i) => (
                <tr key={r.id || i}>
                  <td className="border border-gray-300 p-2">
                    {nomeRecurso(r.tipo, r.idRecurso)}
                  </td>
                  <td className="border border-gray-300 p-2">{formatarData(r.data)}</td>
                  <td className="border border-gray-300 p-2">{r.horario}</td>
                  <td className="border border-gray-300 p-2">{nomeUsuario(r.idUsuario)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {reservasFiltradas.length == 0 && (
            <p className="mt-4">Nenhuma reserva encontrada.</p>
          )}
        </div>
      </main>
    </div>
  );
}