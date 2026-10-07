import conectaBD from "../config/dbConnect.js";

class Sala {

    constructor(id, codigo, nome, capacidade, localizacao, tipo) {
        this.id = id;
        this.codigo = codigo;
        this.nome = nome;
        this.capacidade = capacidade;
        this.localizacao = localizacao;
        this.tipo = tipo;
    }

    static async buscarTodos() {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query("SELECT * FROM Recurso WHERE tipo='S'");
            return result.recordset;
        }
        catch (erro) {
            throw new Error(`Erro na consulta ao BD`);
        }
    }

    static async buscarSalaPorId(idSala) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM Recurso WHERE id=${idSala} AND tipo='S'`);
            return result.recordset;
        }
        catch (erro) {
            throw new Error(`Erro na consulta ao BD`);
        }
    }

    static async removerSala(idSala) {
        try {
            const conexao = await conectaBD();
            await conexao.query(`DELETE FROM Recurso WHERE id=${idSala} AND tipo='S'`);
        }
        catch (erro) {
            throw new Error(`Erro na remoção ao BD`);
        }
    }

    static async inserirSala(sala) {
        const { codigo, nome, capacidade, localizacao } = sala;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`
                INSERT INTO Recurso
                (codigo, nome, capacidade, localizacao, tipo)
                VALUES
                ('${codigo}', '${nome}', ${capacidade}, '${localizacao}', 'S')
            `);
            return result;
        }
        catch (erro) {
            throw new Error(`Erro na inserção ao BD`);
        }
    }

    static async alterarSala(sala) {
        const { id, codigo, nome, capacidade, localizacao } = sala;
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`
                UPDATE Recurso
                SET codigo='${codigo}',
                    nome='${nome}',
                    capacidade=${capacidade},
                    localizacao='${localizacao}'
                WHERE id=${id} AND tipo='S'
            `);
            return result;
        }
        catch (erro) {
            throw new Error(`Erro na alteração ao BD`);
        }
    }
}
export default Sala;