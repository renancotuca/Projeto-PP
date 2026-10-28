"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./style.css";

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

    const partes = String(data).slice(0, 10).split("-");

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
    if (filtroData && String(r.data_inicial).slice(0, 10) !== filtroData) {
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
    <div className="pagina-consulta">
      <header className="cabecalho-consulta">
        <h1>Sistema de Reservas</h1>

        <nav>
          <Link href="/">Página inicial</Link>
          <Link href="/reservas">Fazer reserva</Link>
          <Link href="/consultar-reservas">Consultar reservas</Link>
        </nav>
      </header>

      <main className="conteudo-consulta">
        <div className="painel-consulta">
          <h2>Consultar reservas</h2>

          <div className="filtros-consulta">
            <div className="campo-consulta">
              <label>Data</label>
              <input
                type="date"
                value={filtroData}
                onChange={(e) => setFiltroData(e.target.value)}
              />
            </div>

            <div className="campo-consulta">
              <label>Usuário</label>
              <select
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

            <div className="campo-consulta">
              <label>Laboratório ou sala</label>
              <select
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

          <button className="botao-limpar" onClick={limparFiltros}>
            Limpar filtros
          </button>

          <div className="tabela-consulta">
            <table>
              <thead>
                <tr>
                  <th>Recurso</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Usuário</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {reservasFiltradas.map((r) => (
                  <tr key={r.id}>
                    <td>{r.recurso || "Não informado"}</td>
                    <td>{formatarData(r.data_inicial)}</td>
                    <td>
                      {formatarHora(r.hora_inicial)} - {formatarHora(r.hora_final)}
                    </td>
                    <td>{r.usuario || "Não informado"}</td>
                    <td>{r.status || "Não informado"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {reservasFiltradas.length === 0 && (
            <p className="mensagem-vazia">
              Nenhuma reserva encontrada.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
