import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/AbrirPacote.scss';

interface Carta {
  id: number;
  nome: string;
  descricao: string;
  card_images?: { image_url: string }[];
}

function AbrirPacote() {
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [cartasViradas, setCartasViradas] = useState<boolean[]>([false, false, false, false, false]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    const buscarCartas = async () => {
      try {
        const resposta = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1000&offset=0');
        const todasCartas = resposta.data.data as Carta[];

        const cartasComImagem = todasCartas.filter(carta => carta.card_images && carta.card_images.length > 0);

        if (cartasComImagem.length < 5) {
          setErro('Não há cartas suficientes com imagem.');
          return;
        }

        const cartasSelecionadas: Carta[] = [];
        const usados = new Set<number>();

        while (cartasSelecionadas.length < 5) {
          const indice = Math.floor(Math.random() * cartasComImagem.length);
          if (!usados.has(indice)) {
            usados.add(indice);
            cartasSelecionadas.push(cartasComImagem[indice]);
          }
        }

        setCartas(cartasSelecionadas);
      } catch (erro) {
        console.error('Erro ao carregar cartas:', erro);
        setErro('Erro ao carregar as cartas.');
      }
    };

    buscarCartas();
  }, []);

  const virarCarta = (index: number) => {
    const novasCartasViradas = [...cartasViradas];
    novasCartasViradas[index] = true;
    setCartasViradas(novasCartasViradas);
  };

  return (
    <div className="container-ap">
      <h2 className="titulo-ap">Abra o Pacote!</h2>
      <div className="cartas-container-ap">
        {erro ? (
          <p>{erro}</p>
        ) : cartas.length === 5 ? (
          cartas.map((carta, index) => (
            <div key={carta.id} className="card-ap">
              <div onClick={() => virarCarta(index)} className="card-body-ap">
                {cartasViradas[index] ? (
                  <img
                    src={carta.card_images![0].image_url}
                    alt={carta.nome}
                    className="card-img-ap"
                  />
                ) : (
                  <div className="verso-carta-ap">?</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>Carregando cartas...</p>
        )}
      </div>
    </div>
  );
}

export default AbrirPacote;

