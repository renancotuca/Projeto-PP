import express from "express";

import Sala from "../models/Sala.js";

const router = express.Router();

router.get("/salas", async (req, res) => {

    try {
        const salas = await Sala.buscarTodos();
        res.json(salas);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.get("/salas/:id", async (req, res) => {

    try {
        const sala = await Sala.buscarSalaPorId(req.params.id);
        res.json(sala);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.post("/salas", async (req, res) => {

    try {
        const sala = await Sala.inserirSala(req.body);
        res.json(sala);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.put("/salas/:id", async (req, res) => {

    try {
        const sala = {
            id: req.params.id,
            ...req.body
        };
        const resultado = await Sala.alterarSala(sala);
        res.json(resultado);
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.delete("/salas/:id", async (req, res) => {

    try {
        await Sala.removerSala(req.params.id);
        res.json({ mensagem: "Sala removida com sucesso" });
    }
    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});
export default router;