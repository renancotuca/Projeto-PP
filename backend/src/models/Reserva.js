
import conectaBD from "../config/dbConnect.js";

class Reserva {
    static async buscarTodas(filtros = {}) {
        const conexao = await conectaBD();

        let sql = `
            SELECT
                Reserva.id,
                Reserva.data_inicial,
                Reserva.data_final,
                Reserva.hora_inicial,
                Reserva.hora_final,
                Usuario.nome_completo AS usuario,
                Recurso.nome AS recurso,
                Status.descricao AS status
            FROM Reserva
            INNER JOIN Usuario ON Reserva.id_usuario = Usuario.id
            INNER JOIN Recurso ON Reserva.id_recurso = Recurso.id
            INNER JOIN Status ON Reserva.id_status = Status.id
            WHERE 1 = 1
        `;

        if (filtros.data) {
            sql += ` AND '${filtros.data}' BETWEEN Reserva.data_inicial AND Reserva.data_final`;
        }

        if (filtros.id_usuario) {
            sql += ` AND Reserva.id_usuario = ${Number(filtros.id_usuario)}`;
        }

        if (filtros.id_recurso) {
            sql += ` AND Reserva.id_recurso = ${Number(filtros.id_recurso)}`;
        }

        const resultado = await conexao.query(sql);

        return resultado.recordset;
    }

    static async inserir(dados) {
        const conexao = await conectaBD();

        const resultado = await conexao.query(`
            INSERT INTO Reserva (
                id_recurso,
                id_usuario,
                id_status,
                data_inicial,
                data_final,
                hora_inicial,
                hora_final
            )
            VALUES (
                ${Number(dados.id_recurso)},
                ${Number(dados.id_usuario)},
                ${Number(dados.id_status)},
                '${dados.data_inicial}',
                '${dados.data_final}',
                '${dados.hora_inicial}',
                '${dados.hora_final}'
            )
        `);

        return resultado.rowsAffected;
    }

    static async excluir(id) {
        const conexao = await conectaBD();

        const resultado = await conexao.query(`
            DELETE FROM Reserva
            WHERE id = ${Number(id)}
        `);

        if (resultado.rowsAffected[0] === 0) {
            throw new Error("Reserva não encontrada.");
        }

        return resultado.rowsAffected;
    }
}

export default Reserva;
