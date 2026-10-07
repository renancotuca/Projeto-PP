import express from "express";

import Laboratorio from "../models/Laboratorio.js";

const router = express.Router();

router.get("/laboratorios", async (req, res) => {

    try {
        const laboratorios = await Laboratorio.buscarTodos();
        res.json(laboratorios);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }

});

router.get("/laboratorios/:id", async (req, res) => {

    try {
        const laboratorio = await Laboratorio.buscarLaboratorioPorId(req.params.id);
        res.json(laboratorio);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.post("/laboratorios", async (req, res) => {

    try {
        const laboratorio = await Laboratorio.inserirLaboratorio(req.body);
        res.json(laboratorio);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.put("/laboratorios/:id", async (req, res) => {

    try {
        const laboratorio = {
            id: req.params.id,
            ...req.body
        };
        const resultado = await Laboratorio.alterarLaboratorio(laboratorio);
        res.json(resultado);
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.delete("/laboratorios/:id", async (req, res) => {

    try {
        await Laboratorio.removerLaboratorio(req.params.id);
        res.json({ mensagem: "Laboratório removido com sucesso" });
    }

    catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;