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
        email: ""
    });

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);

    function alterarCampo(event) {
        setFormulario({
            ...formulario,
            [event.target.name]: event.target.value
        });
    }

    async function cadastrarUsuario(event) {
        event.preventDefault();

        setMensagem("");
        setErro(false);

        const dadosUsuario = {
            ...formulario,
            cpf: formulario.cpf.replace(/\D/g, ""),
            celular: formulario.celular.replace(/\D/g, "")
        };

        try {
            const resposta = await fetch("http://localhost:3000/usuarios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dadosUsuario)
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    resultado.erro || "Não foi possível cadastrar o usuário."
                );
            }

            setMensagem("Usuário cadastrado com sucesso!");

            setFormulario({
                cpf: "",
                nome_completo: "",
                data_nascimento: "",
                celular: "",
                email: ""
            });
        } catch (error) {
            setErro(true);
            setMensagem(error.message || "Erro ao cadastrar usuário.");
        }
    }

    return (
        <div className="pagina-cadastrar-usuarios">
            <header className="cabecalho-usuarios">
                <nav>
                    <span className="titulo-sistema">
                        Sistema de Reservas
                    </span>

                    <div className="links-usuarios">
                        <Link href="/">Página inicial</Link>
                        <Link href="/reservas">Fazer reserva</Link>
                        <Link href="/consultar-reservas">
                            Consultar reservas
                        </Link>
                    </div>
                </nav>
            </header>

            <main className="conteudo-usuarios">
                <div className="formulario-usuarios">
                    <h1>Cadastrar usuário</h1>

                    <p>
                        Preencha os dados para cadastrar um novo usuário no sistema.
                    </p>

                    <form onSubmit={cadastrarUsuario}>
                        <label htmlFor="cpf">CPF</label>
                        <input
                            id="cpf"
                            name="cpf"
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
                            value={formulario.nome_completo}
                            onChange={alterarCampo}
                            required
                            placeholder="Digite o nome completo"
                        />

                        <label htmlFor="data_nascimento">
                            Data de nascimento
                        </label>
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
                            maxLength={20}
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
                            placeholder="Digite o e-mail"
                        />

                        <button type="submit">
                            Cadastrar usuário
                        </button>
                    </form>

                    {mensagem && (
                        <p
                            className={
                                erro ? "mensagem-erro" : "mensagem-sucesso"
                            }
                        >
                            {mensagem}
                        </p>
                    )}

                    <Link href="/" className="voltar-usuarios">
                        Voltar para a página inicial
                    </Link>
                </div>
            </main>
        </div>
    );
}