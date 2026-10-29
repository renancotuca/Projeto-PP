"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./style.css";

export default function Login() {
    const router = useRouter();

    const [formulario, setFormulario] = useState({
        login: "",
        senha: ""
    });

    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState(false);
    const [carregando, setCarregando] = useState(false);

    function alterarCampo(event) {
        setFormulario({
            ...formulario,
            [event.target.name]: event.target.value
        });
    }

    async function fazerLogin(event) {
        event.preventDefault();

        setMensagem("");
        setErro(false);
        setCarregando(true);

        try {
            const resposta = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formulario)
            });

            const resultado = await resposta.json();

            if (!resposta.ok) {
                throw new Error(
                    resultado.erro || "Não foi possível fazer login."
                );
            }

            sessionStorage.setItem("token", resultado.token);
            sessionStorage.setItem(
                "usuario",
                JSON.stringify(resultado.usuario)
            );

            router.push("/");
        } catch (error) {
            setErro(true);
            setMensagem(error.message || "Erro ao conectar com o servidor.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <main className="pagina-login">
            <div className="caixa-login">
                <h1>Sistema de Reservas</h1>
                <h2>Entrar</h2>

                <p>Entre com seus dados para acessar o sistema.</p>

                <form onSubmit={fazerLogin}>
                    <label htmlFor="login">CPF ou e-mail</label>
                    <input
                        id="login"
                        name="login"
                        value={formulario.login}
                        onChange={alterarCampo}
                        required
                        placeholder="Digite seu CPF ou e-mail"
                    />

                    <label htmlFor="senha">Senha</label>
                    <input
                        id="senha"
                        name="senha"
                        type="password"
                        value={formulario.senha}
                        onChange={alterarCampo}
                        required
                        placeholder="Digite sua senha"
                    />

                    <button type="submit" disabled={carregando}>
                        {carregando ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                {mensagem && (
                    <p className={erro ? "erro-login" : "sucesso-login"}>
                        {mensagem}
                    </p>
                )}

                <p className="texto-cadastro">
                    Ainda não tem uma conta?
                </p>

                <Link
                    href="/cadastrar-usuarios"
                    className="link-cadastro-login"
                >
                    Criar uma conta
                </Link>
            </div>
        </main>
    );
}