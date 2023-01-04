import './styles.css';
import { Card, CardProps } from "../Card";
import { embaralharCards } from '../../utils/card';
import { useRef, useState } from 'react';

export interface GridProps {
  cards: CardProps[];
}

export function Grid( {cards}: GridProps ) {

  const [sCards, setSCards] = useState( () => embaralharCards( cards ) );
  const primeiroCard = useRef<CardProps | null>(null);
  const segundoCard = useRef<CardProps | null>(null);
  const desvirarCard = useRef(false);  
  const [movimentos, setMovimentos] = useState( 0 );

  const handleReset = () => {
    setSCards( embaralharCards( cards ) );
    primeiroCard.current = null;
    segundoCard.current = null;
    desvirarCard.current = false;    
    setMovimentos(0);
  }

  const handleClick = (id: string) => {
    const novoEstado = sCards.map(card =>{
      if( card.id !== id || card.flipped ){
        return card;
      }

      if( desvirarCard.current && primeiroCard.current && segundoCard.current ) {
        primeiroCard.current.flipped = false;
        segundoCard.current.flipped = false;

        primeiroCard.current = null;
        segundoCard.current = null;

        desvirarCard.current = false;
      }

      card.flipped = true;

      if( primeiroCard.current === null ) {
        primeiroCard.current = card;
      }else if( segundoCard.current === null ) {
        segundoCard.current = card;
      }

      if( primeiroCard.current && segundoCard.current ){

        const achouUmPar = primeiroCard.current.conteudo === segundoCard.current.conteudo
        if( achouUmPar ){
          primeiroCard.current = null;
          segundoCard.current = null;
        }else{
          desvirarCard.current = true;
        }

        setMovimentos( movimentos + 1 );
      }
      return card;
    } );

    setSCards( novoEstado );
  }

  return( 
    <>
      <div className="info">
        <h2>Jogo da Memória </h2>
        <button onClick={handleReset}>Resetar</button>
        <p>Movimentos: {movimentos}</p>
      </div>
      <div className="grid">
        {
          sCards.map( c => <Card { ...c } key={c.id} handleClick={ handleClick }/>)
        }
      </div>
    </>
  )
}