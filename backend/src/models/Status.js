import conectaDB from "../config/dbConnect.js";

class Status {

    constructor(id, descricao) {
        this.id = id;
        this.descricao = descricao;
    }

    static async buscarTodos() {
        try {
            const conexao = await conectaDB();
            const result = await conexao.query("SELECT * FROM Status");
            return result.recordset;
        } catch (erro) {
            throw new Error("Erro na consulta");
        }
    }

    static async buscarStatusPorId(idStatus) {
        try {
            const conexao = await conectaDB();
            const result = await conexao.query(`SELECT * FROM Status WHERE id=${idStatus}`);
            return result.recordset;
        } catch (erro) {
            throw new Error("Erro na consulta");
        }
    }

    static async removerStatus(idStatus) {
        try {
            const conexao = await conectaDB();
            const result = await conexao.query(`DELETE FROM Status WHERE id=${idStatus}`);
            return result;
        } catch (erro) {
            throw new Error("Erro para deleta");
        }
    }

    static async inserirStatus(status) {
        const {descricao} = status;

        try {
            const conexao = await conectaDB();
            const result = await conexao.query(`INSERT INTO Status (descricao) VALUES ('${descricao}')`);
            return result;
        } catch (erro) {
            throw new Error("Erro para inserir");
        }
    }

    static async alterarStatus(status) {
        const {id, descricao} = status;

        try {
            const conexao = await conectaDB();
            const result = await conexao.query(`UPDATE Status SET descricao='${descricao}' WHERE id=${id }`);
            return result;
        } catch (erro) {
            throw new Error("Erro para alterar");
        }
    }

}

export default Status;
