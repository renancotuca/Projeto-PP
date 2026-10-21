"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Reservas() {
  const [salas, setSalas] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [recurso, setRecurso] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [usuario, setUsuario] = useState("");

  const horarios = [
    "07:00", "07:45", "08:30", "09:15", "10:00",
    "10:45", "11:30", "12:15", "13:00", "13:45",
    "14:30", "15:15", "16:00", "16:45", "17:30",
    "18:15", "19:00", "19:45", "20:30", "21:15",
  ];

  useEffect(() => {
    async function carregarRecursos() {
      try {
        const respostaSalas = await fetch("http://localhost:3000/salas");
        const dadosSalas = await respostaSalas.json();

        console.log("Salas recebidas:", dadosSalas);

        setSalas(
          Array.isArray(dadosSalas) ? dadosSalas : []
        );

        const respostaLaboratorios = await fetch(
          "http://localhost:3000/laboratorios"
        );
        const dadosLaboratorios = await respostaLaboratorios.json();

        console.log("Laboratórios recebidos:", dadosLaboratorios);

        setLaboratorios(
          Array.isArray(dadosLaboratorios) ? dadosLaboratorios : []
        );
      } catch (erro) {
        console.log("Erro ao carregar recursos:", erro);
      }
    }

    async function carregarUsuarios() {
      try {
        const resposta = await fetch("http://localhost:3000/usuarios");
        const dados = await resposta.json();

        console.log("Usuários recebidos:", dados);

        setUsuarios(Array.isArray(dados) ? dados : []);
      } catch (erro) {
        console.log("Erro ao buscar usuários:", erro);
      }
    }

    carregarRecursos();
    carregarUsuarios();
  }, []);

  async function confirmarReserva(e) {
    e.preventDefault();

    if (!recurso || !data || !horario || !usuario) {
      alert("Preencha todos os campos.");
      return;
    }

    const partes = recurso.split("-");
    const tipo = partes[0];
    const idRecurso = partes[1];

    try {
      const resposta = await fetch("http://localhost:3000/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tipo: tipo,
          idRecurso: idRecurso,
          idUsuario: usuario,
          data: data,
          horario: horario,
        }),
      });

      if (resposta.ok) {
        alert("Reserva realizada!");

        setRecurso("");
        setData("");
        setHorario("");
        setUsuario("");
      } else {
        const erro = await resposta.text();
        console.log("Erro retornado pelo servidor:", erro);
        alert("Erro ao fazer a reserva.");
      }
    } catch (erro) {
      console.log("Erro ao enviar reserva:", erro);
      alert("Não foi possível conectar ao servidor.");
    }
  }

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
        <form
          onSubmit={confirmarReserva}
          className="bg-white border border-gray-300 p-6 w-96 max-w-full"
        >
          <h2 className="font-bold text-lg mb-4">Fazer reserva</h2>

          <label htmlFor="recurso">Laboratório ou sala</label>
          <select
            id="recurso"
            className="w-full border border-gray-300 p-2 mb-3"
            value={recurso}
            onChange={(e) => setRecurso(e.target.value)}
            required
          >
            <option value="">Selecione</option>

            {laboratorios.map((lab) => (
              <option
                key={"laboratorio-" + lab.id}
                value={"laboratorio-" + lab.id}
              >
                Laboratório {lab.nome}
              </option>
            ))}

            {salas.map((sala) => (
              <option
                key={"sala-" + sala.id}
                value={"sala-" + sala.id}
              >
                Sala {sala.nome}
              </option>
            ))}
          </select>

          <label htmlFor="data">Data</label>
          <input
            id="data"
            type="date"
            className="w-full border border-gray-300 p-2 mb-3"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />

          <label htmlFor="horario">Horário</label>
          <select
            id="horario"
            className="w-full border border-gray-300 p-2 mb-3"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
            required
          >
            <option value="">Selecione</option>

            {horarios.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <label htmlFor="usuario">Usuário</label>
          <select
            id="usuario"
            className="w-full border border-gray-300 p-2 mb-4"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          >
            <option value="">Selecione</option>

            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome_completo || u.nome || u.nomeCompleto || u.email}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-slate-700 hover:bg-slate-800 text-white p-2"
          >
            Confirmar reserva
          </button>
        </form>
      </main>
    </div>
  );
}