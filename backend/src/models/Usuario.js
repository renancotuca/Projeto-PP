import conectaBD from "../config/dbConnect.js";

class Usuario {

    constructor(id, cpf, nome_completo, data_nascimento, celular, email, data_cadastro) {
        this.id = id;
        this.cpf = cpf;
        this.nome_completo = nome_completo;
        this.data_nascimento = data_nascimento;
        this.celular = celular;
        this.email = email;
        this.data_cadastro = data_cadastro;
    }

    static async buscarTodos() {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query("SELECT * FROM Usuario");
            return result.recordset;
        } catch (erro) {
            console.error("Erro ao buscar usuários:", erro);
            throw new Error(`Erro na consulta ao BD: ${erro.message}`);
        }
    }

    static async buscarUsuarioPorId(idUsuario) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(
                `SELECT * FROM Usuario WHERE id=${idUsuario}`
            );
            return result.recordset;
        } catch (erro) {
            console.error("Erro ao buscar usuário por ID:", erro);
            throw new Error(`Erro na consulta ao BD: ${erro.message}`);
        }
    }

    static async removerUsuario(idUsuario) {
        try {
            const conexao = await conectaBD();
            await conexao.query(
                `DELETE FROM Usuario WHERE id=${idUsuario}`
            );
        } catch (erro) {
            console.error("Erro ao remover usuário:", erro);
            throw new Error(`Erro na remoção ao BD: ${erro.message}`);
        }
    }

    static async inserirUsuario(usuario) {
        const {
            cpf,
            nome_completo,
            data_nascimento,
            celular,
            email
        } = usuario;

        try {
            const conexao = await conectaBD();

            const result = await conexao.query(`
                INSERT INTO Usuario
                    (cpf, nome_completo, data_nascimento, celular, email)
                VALUES
                    ('${cpf}', '${nome_completo}', '${data_nascimento}', '${celular}', '${email}')
            `);

            return result;
        } catch (erro) {
            console.error("Erro original ao inserir usuário:", erro);
            throw new Error(`Erro na inserção ao BD: ${erro.message}`);
        }
    }

    static async alterarUsuario(usuario) {
        const {
            id,
            cpf,
            nome_completo,
            data_nascimento,
            celular,
            email
        } = usuario;

        try {
            const conexao = await conectaBD();

            const result = await conexao.query(`
                UPDATE Usuario
                SET cpf='${cpf}',
                    nome_completo='${nome_completo}',
                    data_nascimento='${data_nascimento}',
                    celular='${celular}',
                    email='${email}'
                WHERE id=${id}
            `);

            return result;
        } catch (erro) {
            console.error("Erro ao alterar usuário:", erro);
            throw new Error(`Erro na alteração ao BD: ${erro.message}`);
        }
    }
}

export default Usuario;