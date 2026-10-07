import conectaBD from "../config/dbConnect.js";

class Laboratorio {

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
            const result = await conexao.query("SELECT * FROM Recurso WHERE tipo='L'");
            return result.recordset;
        }
        catch (erro) {
            throw new Error(`Erro na consulta ao BD`);
        }
    }

    static async buscarLaboratorioPorId(idLaboratorio) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM Recurso WHERE id=${idLaboratorio} AND tipo='L'`);
            return result.recordset;
        }
        catch (erro) {
            throw new Error(`Erro na consulta ao BD`);
        }
    }

    static async removerLaboratorio(idLaboratorio) {
        try {
            const conexao = await conectaBD();
            await conexao.query(`DELETE FROM Recurso WHERE id=${idLaboratorio} AND tipo='L'`);
        }
        catch (erro) {
            throw new Error(`Erro na remoção ao BD`);
        }
    }

    static async inserirLaboratorio(laboratorio) {
        const { codigo, nome, capacidade, localizacao } = laboratorio;

        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`
                INSERT INTO Recurso
                (codigo, nome, capacidade, localizacao, tipo)
                VALUES
                ('${codigo}', '${nome}', ${capacidade}, '${localizacao}', 'L')
            `);
            return result;
        }
        catch (erro) {
            throw new Error(`Erro na inserção ao BD`);
        }
    }

    static async alterarLaboratorio(laboratorio) {
        const { id, codigo, nome, capacidade, localizacao } = laboratorio;

        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`
                UPDATE Recurso
                SET codigo='${codigo}',
                    nome='${nome}',
                    capacidade=${capacidade},
                    localizacao='${localizacao}'
                WHERE id=${id} AND tipo='L'
            `);
            return result;
        }
        catch (error) {
            throw new Error(`Erro na alteração ao BD: ${error}`);
        }
    }
}
export default Laboratorio;