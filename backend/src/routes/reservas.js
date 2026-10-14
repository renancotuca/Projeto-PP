import express from "express";
import Reserva from "../models/Reserva.js";

const router = express.Router();

router.get("/reservas", async (req, res) => {
    try {
        const filtros = {
            data: req.query.data,
            id_usuario: req.query.id_usuario,
            id_recurso: req.query.id_recurso
        };

        const reservas = await Reserva.buscarTodas(filtros);

        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

router.post("/reservas", async (req, res) => {
    try {
        const dados = req.body;

        await Reserva.inserir(dados);

        res.status(201).json({
            mensagem: "Reserva cadastrada com sucesso"
        });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

export default router;
