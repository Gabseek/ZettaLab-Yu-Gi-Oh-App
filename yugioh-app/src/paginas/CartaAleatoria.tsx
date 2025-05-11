import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../estilos/CartaAleatoria.scss';

interface Carta {
  id: number;
  nome: string;
  descricao: string;
  card_images?: { image_url: string }[];
}

interface CartaComImagem extends Carta {
  imagem: string | null;
}

function CartaAleatoria() {
  const [cartaAleatoria, setCartaAleatoria] = useState<CartaComImagem | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php?num=1000&offset=0')
      .then(resposta => {
        const todasCartas = resposta.data.data as Carta[];

        if (todasCartas.length > 0) {
          const cartaSelecionada = todasCartas[Math.floor(Math.random() * todasCartas.length)];
          const imagemDaCarta = cartaSelecionada.card_images ? cartaSelecionada.card_images[0].image_url : null;

          if (imagemDaCarta) {
            setCartaAleatoria({
              ...cartaSelecionada,
              imagem: imagemDaCarta,
            });
          } else {
            setErro('A carta selecionada não possui imagem.');
          }
        } else {
          setErro('Nenhuma carta encontrada.');
        }
      })
      .catch(erro => {
        console.error('Erro ao carregar cartas:', erro);
        setErro('Erro ao carregar as cartas.');
      });
  }, []);

  return (
    <div className="container-ca">
      <div className="card-ca">
        <h1 className="titulo-ca">Carta Aleatória</h1>
        {erro ? (
          <p>{erro}</p>
        ) : cartaAleatoria ? (
          <>
            {cartaAleatoria.imagem ? (
              <img src={cartaAleatoria.imagem} className="card-img-top-ca" alt={cartaAleatoria.nome} />
            ) : (
              <p>Imagem não disponível</p>
            )}
          </>
        ) : (
          <p>Carregando carta...</p>
        )}
      </div>
    </div>
  );
}

export default CartaAleatoria;

