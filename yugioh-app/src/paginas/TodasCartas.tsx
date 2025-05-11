import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/TodasCartas.scss';

interface Carta {
  id: number;
  nome: string;
  descricao: string;
  card_images?: { image_url: string }[];
}

function TodasCartas() {
  const [cartas, setCartas] = useState<Carta[]>([]);

  useEffect(() => {
    axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1000&offset=0')
      .then(resposta => {
        setCartas(resposta.data.data);
      })
      .catch(erro => {
        console.error('Erro ao carregar cartas:', erro);
      });
  }, []);

  return (
    <div className="container-tc">
      <h2 className="titulo-tc">Todas as Cartas</h2>
      <div className="cartas-container-tc">
        {cartas.map(carta => (
          <div key={carta.id} className="card-tc">
            <img 
              className="card-img-top-tc" 
              src={carta.card_images ? carta.card_images[0].image_url : ''} 
              alt={carta.nome} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodasCartas;

