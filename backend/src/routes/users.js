import express from "express";
import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";

const router = express.Router();

router.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await Usuario.buscarTodos();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/usuarios/:id", async (req, res) => {
    try {
        const usuario = await Usuario.buscarUsuarioPorId(req.params.id);
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.post("/usuarios", async (req, res) => {
    try {
        const resultado = await Usuario.inserirUsuario(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        res.status(400).json({ erro: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { login, senha } = req.body;

        if (!login || !senha) {
            return res.status(400).json({
                erro: "Informe o CPF ou e-mail e a senha"
            });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({
                erro: "JWT_SECRET não está configurada no arquivo .env"
            });
        }

        const usuario = await Usuario.buscarPorLogin(login);

        if (!usuario) {
            return res.status(401).json({
                erro: "CPF, e-mail ou senha incorretos"
            });
        }

        const senhaValida = await Usuario.verificarSenha(
            senha,
            usuario.senha
        );

        if (!senhaValida) {
            return res.status(401).json({
                erro: "CPF, e-mail ou senha incorretos"
            });
        }

        const token = jwt.sign(
            {
                id: usuario.id,
                email: usuario.email
            },
            process.env.JWT_SECRET,
            { expiresIn: "2h" }
        );

        res.json({
            mensagem: "Login realizado com sucesso",
            token,
            usuario: {
                id: usuario.id,
                nome_completo: usuario.nome_completo,
                email: usuario.email
            }
        });
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ erro: "Erro ao realizar login" });
    }
});

router.put("/usuarios/:id", async (req, res) => {
    try {
        const usuario = {
            id: req.params.id,
            ...req.body
        };

        const resultado = await Usuario.alterarUsuario(usuario);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.delete("/usuarios/:id", async (req, res) => {
    try {
        await Usuario.removerUsuario(req.params.id);
        res.json({ mensagem: "Usuário removido com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;