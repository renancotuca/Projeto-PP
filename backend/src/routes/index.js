import express from 'express';
import users from './users.js';
import laboratorios from "./laboratorios.js";

const routes = (app) => {
    app.route("/").get((req, res) => 
        res.status(200).json({ message: "API rodando" })
    );

    app.use(express.json(), users, laboratorios);
}

export default routes;