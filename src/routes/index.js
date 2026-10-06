import express from 'express';
import users from './users.js';

const routes = (app) => {
    app.route("/").get((req, res) => 
        res.status(200).json({ message: "API rodando" })
    );

    app.use(express.json(), users);
}

export default routes;