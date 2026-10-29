import conectaBD from "../config/dbConnect.js";
import bcrypt from "bcrypt";

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

            const result = await conexao.query(`
                SELECT id, cpf, nome_completo, data_nascimento,
                       celular, email, data_cadastro
                FROM Usuario
            `);

            return result.recordset;
        } catch (erro) {
            console.error("Erro ao buscar usuários:", erro);
            throw new Error(`Erro na consulta ao BD: ${erro.message}`);
        }
    }

    static async buscarUsuarioPorId(idUsuario) {
        try {
            const conexao = await conectaBD();
            const request = new conexao.Request();

            request.input("id", idUsuario);

            const result = await request.query(`
                SELECT id, cpf, nome_completo, data_nascimento,
                       celular, email, data_cadastro
                FROM Usuario
                WHERE id = @id
            `);

            return result.recordset;
        } catch (erro) {
            console.error("Erro ao buscar usuário:", erro);
            throw new Error(`Erro na consulta ao BD: ${erro.message}`);
        }
    }

    static async removerUsuario(idUsuario) {
        try {
            const conexao = await conectaBD();
            const request = new conexao.Request();

            request.input("id", idUsuario);

            const result = await request.query(`
                DELETE FROM Usuario
                WHERE id = @id
            `);

            if (result.rowsAffected[0] === 0) {
                throw new Error("Nenhum usuário encontrado com esse ID.");
            }

            return result;
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
            email,
            senha
        } = usuario;

        if (
            !cpf ||
            !nome_completo ||
            !data_nascimento ||
            !celular ||
            !email ||
            !senha
        ) {
            throw new Error("Preencha todos os campos, incluindo a senha");
        }

        if (senha.length < 8) {
            throw new Error("A senha deve ter pelo menos 8 caracteres");
        }

        try {
            const conexao = await conectaBD();
            const senhaHash = await bcrypt.hash(senha, 10);
            const request = new conexao.Request();

            request.input("cpf", cpf);
            request.input("nome_completo", nome_completo);
            request.input("data_nascimento", data_nascimento);
            request.input("celular", celular);
            request.input("email", email);
            request.input("senha", senhaHash);

            await request.query(`
                INSERT INTO Usuario
                    (cpf, nome_completo, data_nascimento, celular, email, senha)
                VALUES
                    (@cpf, @nome_completo, @data_nascimento, @celular, @email, @senha)
            `);

            return {
                mensagem: "Usuário cadastrado com sucesso"
            };
        } catch (erro) {
            console.error("Erro ao inserir usuário:", erro);
            throw new Error(`Erro na inserção ao BD: ${erro.message}`);
        }
    }

    static async buscarPorLogin(login) {
        try {
            const conexao = await conectaBD();
            const request = new conexao.Request();

            request.input("login", login);

            const result = await request.query(`
                SELECT id, cpf, nome_completo, email, senha
                FROM Usuario
                WHERE cpf = @login OR email = @login
            `);

            return result.recordset[0] || null;
        } catch (erro) {
            console.error("Erro ao buscar login:", erro);
            throw new Error(`Erro ao consultar usuário: ${erro.message}`);
        }
    }

    static async verificarSenha(senha, senhaHash) {
        return bcrypt.compare(senha, senhaHash);
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
            const request = new conexao.Request();

            request.input("id", id);
            request.input("cpf", cpf);
            request.input("nome_completo", nome_completo);
            request.input("data_nascimento", data_nascimento);
            request.input("celular", celular);
            request.input("email", email);

            const result = await request.query(`
                UPDATE Usuario
                SET cpf = @cpf,
                    nome_completo = @nome_completo,
                    data_nascimento = @data_nascimento,
                    celular = @celular,
                    email = @email
                WHERE id = @id
            `);

            return result;
        } catch (erro) {
            console.error("Erro ao alterar usuário:", erro);
            throw new Error(`Erro na alteração ao BD: ${erro.message}`);
        }
    }
}

export default Usuario;
