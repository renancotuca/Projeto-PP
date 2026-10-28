"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./style.css";

export default function Reservas() {
  const [salas, setSalas] = useState([]);
  const [laboratorios, setLaboratorios] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const [recurso, setRecurso] = useState("");
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [horarioFinal, setHorarioFinal] = useState("");
  const [usuario, setUsuario] = useState("");

  const [mensagem, setMensagem] = useState("");
  const [tipoMensagem, setTipoMensagem] = useState("");

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
        setSalas(Array.isArray(dadosSalas) ? dadosSalas : []);

        const respostaLaboratorios = await fetch(
          "http://localhost:3000/laboratorios"
        );
        const dadosLaboratorios = await respostaLaboratorios.json();
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

    setMensagem("");
    setTipoMensagem("");

    if (!recurso || !data || !horario || !horarioFinal || !usuario) {
      setMensagem("Preencha todos os campos.");
      setTipoMensagem("erro");
      return;
    }

    if (horarioFinal <= horario) {
      setMensagem("O horário final deve ser depois do horário de início.");
      setTipoMensagem("erro");
      return;
    }

    const partes = recurso.split("-");
    const idRecurso = Number(partes[1]);
    const idUsuario = Number(usuario);

    const dadosReserva = {
      id_recurso: idRecurso,
      id_usuario: idUsuario,
      id_status: 4,
      data_inicial: data,
      data_final: data,
      hora_inicial: `${horario}:00`,
      hora_final: `${horarioFinal}:00`,
    };

    console.log("Dados enviados para reserva:", dadosReserva);

    try {
      const resposta = await fetch("http://localhost:3000/reservas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dadosReserva),
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        setMensagem("Reserva realizada com sucesso!");
        setTipoMensagem("sucesso");

        setRecurso("");
        setData("");
        setHorario("");
        setHorarioFinal("");
        setUsuario("");
      } else {
        console.log("Erro retornado pelo servidor:", resultado);

        setMensagem(
          "Erro ao fazer a reserva: " +
            (resultado.erro ||
              resultado.mensagem ||
              "Verifique os dados.")
        );
        setTipoMensagem("erro");
      }
    } catch (erro) {
      console.log("Erro ao enviar reserva:", erro);

      setMensagem("Não foi possível conectar ao servidor.");
      setTipoMensagem("erro");
    }
  }

  return (
    <div className="pagina-reservas">
      <header className="cabecalho-reservas">
        <h1>Sistema de Reservas</h1>

        <nav>
          <Link href="/">Página inicial</Link>
          <Link href="/reservas">Fazer reserva</Link>
          <Link href="/consultar-reservas">Consultar reservas</Link>
        </nav>
      </header>

      <main className="conteudo-reservas">
        <form onSubmit={confirmarReserva} className="formulario-reservas">
          <h2>Fazer reserva</h2>

          {mensagem && (
            <div
              role="status"
              aria-live="polite"
              className={`mensagem-reserva ${tipoMensagem}`}
            >
              {mensagem}
            </div>
          )}

          <label htmlFor="recurso">Laboratório ou sala</label>

          <select
            id="recurso"
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
              <option key={"sala-" + sala.id} value={"sala-" + sala.id}>
                Sala {sala.nome}
              </option>
            ))}
          </select>

          <label htmlFor="data">Data</label>

          <input
            id="data"
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />

          <label htmlFor="horario">Horário de início</label>

          <select
            id="horario"
            value={horario}
            onChange={(e) => {
              setHorario(e.target.value);

              if (horarioFinal && horarioFinal <= e.target.value) {
                setHorarioFinal("");
              }
            }}
            required
          >
            <option value="">Selecione o horário de início</option>

            {horarios.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>

          <label htmlFor="horarioFinal">Horário final</label>

          <select
            id="horarioFinal"
            value={horarioFinal}
            onChange={(e) => setHorarioFinal(e.target.value)}
            required
          >
            <option value="">Selecione o horário final</option>

            {horarios
              .filter((h) => !horario || h > horario)
              .map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
          </select>

          <label htmlFor="usuario">Usuário</label>

          <select
            id="usuario"
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

          <button type="submit">Confirmar reserva</button>
        </form>
      </main>
    </div>
  );
}
