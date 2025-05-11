import React from 'react';
import { Link } from 'react-router-dom';

function Cabecalho() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Yu-Gi-Oh App</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Início</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cartaAleatoria">Carta Aleatória</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/abrirPacote">Abrir Pacote</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/todasCartas">Todas as Cartas</Link> 
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Cabecalho;

