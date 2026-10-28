
import Link from "next/link";
import "./style.css";

export default function Home() {
  return (
    <div className="pagina-inicial">
      <header className="cabecalho-inicial">
        <nav>
          <span className="titulo-sistema">Sistema de Reservas</span>

          <div className="links-navegacao">
            <Link href="/" className="link-ativo">
              Página inicial
            </Link>

            <Link href="/reservas">
              Fazer reserva
            </Link>

            <Link href="/consultar-reservas">
              Consultar reservas
            </Link>
          </div>
        </nav>
      </header>

      <main className="conteudo-inicial">
        <div className="cards-inicial">
          <div className="card-inicial">
            <h2>Fazer reserva</h2>

            <p>
              Escolha um laboratório ou sala para reservar.
            </p>

            <Link href="/reservas" className="link-card">
              Nova reserva
            </Link>
          </div>

          <div className="card-inicial">
            <h2>Consultar reservas</h2>

            <p>
              Consulte as reservas feitas.
            </p>

            <Link href="/consultar-reservas" className="link-card">
              Ver reservas
            </Link>
          </div>

          <div className="card-inicial">
            <h2>Cadastrar laboratórios e salas</h2>

            <p>
              Cadastre novos laboratórios e salas para disponibilizá-los para reservas.
            </p>

            <Link href="/cadastrar-recursos" className="link-card">
              Cadastrar recursos
            </Link>
          </div>
        </div>
      </main>

      <footer className="rodape-inicial">
        <h2>Sobre o sistema</h2>

        <p>
          Este sistema permite realizar reservas de recursos e visualizar as reservas feitas.
        </p>
      </footer>
    </div>
  );
}
