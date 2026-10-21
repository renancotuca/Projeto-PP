import express from "express";
import cors from "cors";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:3000",
        "http://localhost:3001"
    ]
}));

app.use(express.json());

routes(app);

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});