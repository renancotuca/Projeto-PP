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
    "07:00", "07:45", "08:30", "09:15", "10:00", "10:45", "11:30",
    "12:15", "13:00", "13:45", "14:30", "15:15", "16:00", "16:45",
    "17:30", "18:15", "19:00", "19:45", "20:30", "21:15",
  ];

  useEffect(() => {
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

  function confirmarReserva(e) {
    e.preventDefault();

    const partes = recurso.split("-");

    fetch("http://localhost:3000/reservas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: partes[0],
        idRecurso: partes[1],
        idUsuario: usuario,
        data: data,
        horario: horario,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert("Reserva realizada!");
          setRecurso("");
          setData("");
          setHorario("");
          setUsuario("");
        } else {
          alert("Erro ao fazer a reserva.");
        }
      })
      .catch((erro) => {
        console.log(erro);
        alert("Erro ao fazer a reserva.");
      });
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

      <main className="flex justify-center mt-10">
        <form
          onSubmit={confirmarReserva}
          className="bg-white border border-gray-300 p-6 w-96"
        >
          <h2 className="font-bold text-lg mb-4">Fazer reserva</h2>

          <label>Laboratório ou sala</label>
          <select
            className="w-full border border-gray-300 p-2 mb-3"
            value={recurso}
            onChange={(e) => setRecurso(e.target.value)}
            required
          >
            <option value="">Selecione</option>
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

          <label>Data</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-2 mb-3"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />

          <label>Horário</label>
          <select
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

          <label>Usuário</label>
          <select
            className="w-full border border-gray-300 p-2 mb-4"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome}
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