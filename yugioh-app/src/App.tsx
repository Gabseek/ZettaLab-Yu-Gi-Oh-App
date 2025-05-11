import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './paginas/Inicio';
import CartaAleatoria from './paginas/CartaAleatoria';  
import AbrirPacote from './paginas/AbrirPacote';
import TodasCartas from './paginas/TodasCartas'; 
import Cabecalho from './componentes/Cabecalho';  

function App() {
  return (
    <div>
      <Cabecalho /> 
      <main>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/cartaAleatoria" element={<CartaAleatoria />} />
          <Route path="/abrirPacote" element={<AbrirPacote />} />
          <Route path="/todasCartas" element={<TodasCartas />} /> 
        </Routes>
      </main>
    </div>
  );
}

export default App;

