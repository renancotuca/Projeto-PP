
"use client";

import { useState } from "react";
import "./style.css";

export default function CadastrarRecursos() {
  const [tipo, setTipo] = useState("laboratorio");
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [capacidade, setCapacidade] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  async function cadastrarRecurso(event) {
    event.preventDefault();

    setMensagem("");
    setCarregando(true);

    const rota =
      tipo === "laboratorio"
        ? "laboratorios"
        : "salas";

    const dados = {
      codigo,
      nome,
      capacidade: Number(capacidade),
      localizacao
    };

    try {
      const resposta = await fetch(
        `http://localhost:3000/${rota}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dados)
        }
      );

      const resultado = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          resultado.erro || "Não foi possível realizar o cadastro."
        );
      }

      setMensagem(
        tipo === "laboratorio"
          ? "Laboratório cadastrado com sucesso!"
          : "Sala cadastrada com sucesso!"
      );
      setErro(false);

      setCodigo("");
      setNome("");
      setCapacidade("");
      setLocalizacao("");
    } catch (error) {
      setMensagem(error.message || "Erro ao conectar com o servidor.");
      setErro(true);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="pagina-cadastro">
      <header className="cabecalho-cadastro">
        <h1>Sistema de Reservas</h1>
        <a href="/">Página inicial</a>
      </header>

      <main className="conteudo-cadastro">
        <h2>Cadastrar laboratórios e salas</h2>
        <p>Preencha os campos abaixo para cadastrar um novo recurso.</p>

        <form onSubmit={cadastrarRecurso} className="formulario-cadastro">
          <label htmlFor="tipo">Tipo de recurso</label>
          <select
            id="tipo"
            value={tipo}
            onChange={(event) => setTipo(event.target.value)}
          >
            <option value="laboratorio">Laboratório</option>
            <option value="sala">Sala</option>
          </select>

          <label htmlFor="codigo">Código</label>
          <input
            id="codigo"
            type="text"
            value={codigo}
            onChange={(event) => setCodigo(event.target.value)}
            placeholder="Ex.: LAB03 ou SALA03"
            required
          />

          <label htmlFor="nome">Nome</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            placeholder="Digite o nome"
            required
          />

          <label htmlFor="capacidade">Capacidade</label>
          <input
            id="capacidade"
            type="number"
            min="1"
            value={capacidade}
            onChange={(event) => setCapacidade(event.target.value)}
            placeholder="Quantidade de pessoas"
            required
          />

          <label htmlFor="localizacao">Localização</label>
          <input
            id="localizacao"
            type="text"
            value={localizacao}
            onChange={(event) => setLocalizacao(event.target.value)}
            placeholder="Ex.: Bloco A"
            required
          />

          <button type="submit" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar"}
          </button>

          {mensagem && (
            <p className={erro ? "mensagem-erro" : "mensagem-sucesso"}>
              {mensagem}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
