import express from "express";
import Status from "../models/Status.js";

const router = express.Router();

router.get("/status", async (req, res) => {

    try {
        const status = await Status.buscarTodos();
        res.json(status);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }

});

router.get("/status/:id", async (req, res) => {

    try {
        const status = await Status.buscarStatusPorId(req.params.id);
        res.json(status);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }

});

router.post("/status", async (req, res) => {

    try {
        const status = await Status.inserirStatus(req.body);
        res.json(status);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }

});

router.put("/status/:id", async (req, res) => {

    try {
        const status = {
            id: req.params.id,
            ...req.body
        };

        const resultado = await Status.alterarStatus(status);
        res.json(resultado);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }

});

router.delete("/status/:id", async (req, res) => {

    try {
        await Status.removerStatus(req.params.id);
        res.json({ mensagem: "Status removido com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }

});

export default router;