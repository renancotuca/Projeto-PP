import express from "express";
import laboratorios from "./laboratorios.js";
import salas from "./salas.js";
import users from "./users.js";

export default function routes(app) {
    app.use(express.json());

    app.use(laboratorios);
    app.use(salas);
    app.use(users);
}