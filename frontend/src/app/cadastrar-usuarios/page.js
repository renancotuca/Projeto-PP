"use client";

import { useState } from "react";

export default function CadastrarUsuarios() {
  const [formulario, setFormulario] = useState({
    cpf: "",
    nome_completo: "",
    data_nascimento: "",
    celular: "",
    email: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");
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
    setErro("");

    const cpf = formulario.cpf.replace(/\D/g, "");
    const celular = formulario.celular.replace(/\D/g, "");
    const email = formulario.email.trim();

    const emailValido =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|hotmail\.com|outlook\.com|yahoo\.com)$/i;

    if (cpf.length !== 11) {
      setErro("O CPF deve ter 11 números.");
      return;
    }

    if (!emailValido.test(email)) {
      setErro(
        "Digite um e-mail válido do Gmail, Hotmail, Outlook ou Yahoo."
      );
      return;
    }

    if (celular.length !== 10 && celular.length !== 11) {
      setErro("O telefone deve ter 10 ou 11 números, incluindo o DDD.");
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cpf,
          nome_completo: formulario.nome_completo.trim(),
          data_nascimento: formulario.data_nascimento,
          celular: formulario.celular,
          email,
        }),
      });

      const dados = await resposta.json().catch(() => ({}));

      if (!resposta.ok) {
        throw new Error(
          dados.message ||
            dados.mensagem ||
            "Não foi possível cadastrar o usuário."
        );
      }

      setMensagem("Usuário cadastrado com sucesso!");

      setFormulario({
        cpf: "",
        nome_completo: "",
        data_nascimento: "",
        celular: "",
        email: "",
      });
    } catch (error) {
      setErro(error.message || "Erro ao conectar com o servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto max-w-xl rounded-md border border-gray-300 bg-white p-6 shadow-sm">
        <h1 className="mb-6 text-2xl font-bold text-gray-800">
          Cadastrar usuário
        </h1>

        {mensagem && (
          <p className="mb-4 rounded border border-green-300 bg-green-50 p-3 text-green-800">
            {mensagem}
          </p>
        )}

        {erro && (
          <p className="mb-4 rounded border border-red-300 bg-red-50 p-3 text-red-700">
            {erro}
          </p>
        )}

        <form onSubmit={cadastrar} className="flex flex-col gap-4">
          <div>
            <label htmlFor="cpf" className="mb-1 block text-gray-800">
              CPF
            </label>
            <input
              id="cpf"
              name="cpf"
              type="text"
              inputMode="numeric"
              value={formulario.cpf}
              onChange={alterarCampo}
              maxLength={14}
              required
              placeholder="000.000.000-00"
              className="w-full rounded border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label htmlFor="nome_completo" className="mb-1 block text-gray-800">
              Nome completo
            </label>
            <input
              id="nome_completo"
              name="nome_completo"
              type="text"
              value={formulario.nome_completo}
              onChange={alterarCampo}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label
              htmlFor="data_nascimento"
              className="mb-1 block text-gray-800"
            >
              Data de nascimento
            </label>
            <input
              id="data_nascimento"
              name="data_nascimento"
              type="date"
              value={formulario.data_nascimento}
              onChange={alterarCampo}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label htmlFor="celular" className="mb-1 block text-gray-800">
              Telefone
            </label>
            <input
              id="celular"
              name="celular"
              type="text"
              inputMode="numeric"
              value={formulario.celular}
              onChange={alterarCampo}
              maxLength={15}
              required
              placeholder="(00) 00000-0000"
              className="w-full rounded border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-gray-800">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formulario.email}
              onChange={alterarCampo}
              required
              placeholder="exemplo@gmail.com"
              className="w-full rounded border border-gray-300 px-3 py-2 text-black outline-none focus:border-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
            className="mt-2 rounded bg-gray-700 px-4 py-3 font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregando ? "Cadastrando..." : "Cadastrar usuário"}
          </button>
        </form>
      </div>
    </div>
  );
}