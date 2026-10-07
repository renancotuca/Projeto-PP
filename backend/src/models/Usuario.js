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
            //retorna as linhas que ele puxou do SQL
        }
        catch (erro) {
            throw new Error(`Erro na consulta ao BD`);
        }
    }

    static async buscarUsuarioPorId(idUsuario) {
        try {
            const conexao = await conectaBD();
            const result = await conexao.query(`SELECT * FROM Usuario WHERE id=${idUsuario}`);
            return result.recordset;
        }
        catch (erro) {
            throw new Error(`Erro na consulta ao BD`);
        }
    }

    static async removerUsuario(idUsuario) {
        try {
            const conexao = await conectaBD();
            await conexao.query(`DELETE FROM Usuario WHERE id=${idUsuario}`);
        }
        catch (erro) {
            throw new Error(`Erro na remoção ao BD`);
        }
    }

    static async inserirUsuario(usuario) {
        const { cpf, nome_completo, data_nascimento, celular, email } = usuario;

        try {
            const conexao = await conectaBD();

            const result = await conexao.query(`
                INSERT INTO Usuario 
                (cpf, nome_completo, data_nascimento, celular, email)
                VALUES 
                ('${cpf}', '${nome_completo}', '${data_nascimento}', '${celular}', '${email}')
            `);

            return result;
        }
        catch (erro) {
            throw new Error(`Erro na inserção ao BD`);
        }
    }

    static async alterarUsuario(usuario) {
        const { id, cpf, nome_completo, data_nascimento, celular, email } = usuario;

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
        }
        catch (error) {
            throw new Error(`Erro na alteração ao BD: ${error}`);
        }
    }
}

export default Usuario;