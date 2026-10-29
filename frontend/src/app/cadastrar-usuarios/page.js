"use client";

import { useState } from "react";
import Link from "next/link";
import "./style.css";

export default function CadastrarUsuarios() {
  const [formulario, setFormulario] = useState({
    cpf: "",
    nome_completo: "",
    data_nascimento: "",
    celular: "",
    email: "",
    senha: ""
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);
  const [carregando, setCarregando] = useState(false);

  function formatarCPF(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    return numeros
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function formatarTelefone(valor) {
    const numeros = valor.replace(/\D/g, "").slice(0, 11);

    if (numeros.length <= 2) {
      return numeros.length ? `(${numeros}` : "";
    }

    if (numeros.length <= 6) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    }

    if (numeros.length <= 10) {
      return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    }

    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  }

  function alterarCampo(e) {
    const { name, value } = e.target;

    if (name === "cpf") {
      setFormulario({ ...formulario, cpf: formatarCPF(value) });
      return;
    }

    if (name === "celular") {
      setFormulario({ ...formulario, celular: formatarTelefone(value) });
      return;
    }

    setFormulario({ ...formulario, [name]: value });
  }

  async function cadastrar(e) {
    e.preventDefault();

    setMensagem("");
    setErro(false);

    const cpf = formulario.cpf.replace(/\D/g, "");
    const celular = formulario.celular.replace(/\D/g, "");
    const email = formulario.email.trim();

    const emailValido =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$/i;

    if (cpf.length !== 11) {
      setErro(true);
      setMensagem("O CPF deve ter 11 números.");
      return;
    }

    if (!emailValido.test(email)) {
      setErro(true);
      setMensagem("Digite um e-mail válido do Gmail, Hotmail, Outlook ou Yahoo.");
      return;
    }

    if (celular.length !== 10 && celular.length !== 11) {
      setErro(true);
      setMensagem("O telefone deve ter 10 ou 11 números, incluindo o DDD.");
      return;
    }

    if (formulario.senha.length < 8) {
      setErro(true);
      setMensagem("A senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (!formulario.nome_completo.trim()) {
      setErro(true);
      setMensagem("Informe o nome completo.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cpf,
          nome_completo: formulario.nome_completo.trim(),
          data_nascimento: formulario.data_nascimento,
          celular,
          email,
          senha: formulario.senha
        })
      });

      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dados.erro ||
          dados.message ||
          dados.mensagem ||
          "Não foi possível cadastrar o usuário."
        );
      }

      setErro(false);
      setMensagem("Usuário cadastrado com sucesso!");

      setFormulario({
        cpf: "",
        nome_completo: "",
        data_nascimento: "",
        celular: "",
        email: "",
        senha: ""
      });

    } catch (error) {
      setErro(true);
      setMensagem(error.message || "Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="pagina-cadastrar-usuarios">
      <div className="formulario-usuarios">
        <h1>Cadastrar usuário</h1>

        <p>
          Preencha os dados para cadastrar um novo usuário no sistema.
        </p>

        <form onSubmit={cadastrar}>
          <label htmlFor="cpf">CPF</label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            value={formulario.cpf}
            onChange={alterarCampo}
            required
            maxLength={14}
            placeholder="000.000.000-00"
          />

          <label htmlFor="nome_completo">Nome completo</label>
          <input
            id="nome_completo"
            name="nome_completo"
            type="text"
            value={formulario.nome_completo}
            onChange={alterarCampo}
            required
            placeholder="Digite o nome completo"
          />

          <label htmlFor="data_nascimento">Data de nascimento</label>
          <input
            id="data_nascimento"
            name="data_nascimento"
            type="date"
            value={formulario.data_nascimento}
            onChange={alterarCampo}
            required
          />

          <label htmlFor="celular">Celular</label>
          <input
            id="celular"
            name="celular"
            type="tel"
            value={formulario.celular}
            onChange={alterarCampo}
            required
            maxLength={15}
            placeholder="(11) 98765-4321"
          />

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formulario.email}
            onChange={alterarCampo}
            required
            placeholder="exemplo@gmail.com"
          />

          <label htmlFor="senha">Senha</label>
          <input
            id="senha"
            name="senha"
            type="password"
            value={formulario.senha}
            onChange={alterarCampo}
            required
            minLength={8}
            placeholder="Crie uma senha com pelo menos 8 caracteres"
          />

          <button type="submit" disabled={carregando}>
            {carregando ? "Cadastrando..." : "Cadastrar usuário"}
          </button>
        </form>

        {mensagem && (
          <p className={erro ? "mensagem-erro" : "mensagem-sucesso"}>
            {mensagem}
          </p>
        )}

        <Link href="/login" className="voltar-usuarios">
          Voltar para a página inicial
        </Link>
      </div>
    </main>
  );
}
