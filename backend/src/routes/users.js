import express from "express";

import Usuario from "../models/Usuario.js";

const router = express.Router();

router.get("/usuarios", async (req, res) => {

    try {
        const usuarios = await Usuario.buscarTodos();
        res.json(usuarios);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/usuarios/:id", async (req, res) => {

    try {
        const usuario = await Usuario.buscarUsuarioPorId(req.params.id);
        res.json(usuario);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.post("/usuarios", async (req, res) => {

    try {
        const usuario = await Usuario.inserirUsuario(req.body);
        res.json(usuario);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
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
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.delete("/usuarios/:id", async (req, res) => {

    try {
        await Usuario.removerUsuario(req.params.id);
        res.json({ mensagem: "Usuário removido com sucesso" });
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;