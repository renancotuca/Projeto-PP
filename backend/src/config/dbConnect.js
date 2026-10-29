import "dotenv/config";
import mssql from "mssql";

const stringSQL = process.env.CONNECTION_STRING;

async function conectaBD() {
  try {
    if (!stringSQL) {
      throw new Error("CONNECTION_STRING não foi definida no arquivo .env");
    }

    await mssql.connect(stringSQL);

    return mssql;
  } catch (erro) {
    console.error("Erro no acesso ao banco de dados:", erro.message);
    throw erro;
  }
}

export default conectaBD;