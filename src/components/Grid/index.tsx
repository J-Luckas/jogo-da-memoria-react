import './styles.css';
import { Card, CardProps } from "../Card";
import { embaralharCards } from '../../utils/card';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Temporizador } from './Temporizador';

export interface GridProps {
  cards: CardProps[];
}

export function Grid( {cards}: GridProps ) {

  const [sCards, setSCards] = useState( () => embaralharCards( cards ) );
  const exibirVitoria = useRef(true);
  const primeiroCard = useRef<CardProps | null>(null);
  const segundoCard = useRef<CardProps | null>(null);
  const desvirarCard = useRef(false);  
  const [movimentos, setMovimentos] = useState( 0 );

  const [searchParams] = useSearchParams();
  const modoDeJogo = searchParams.get('modo'); 

  const tentativas = useRef<number>(0);

  const handleReset = () => {
    setSCards( embaralharCards( cards ) );
    primeiroCard.current = null;
    segundoCard.current = null;
    desvirarCard.current = false; 
    exibirVitoria.current = true;   
    setMovimentos(0);
    tentativas.current = 0;
  }

  useEffect( () => {
    if ( sCards.length > 0 ) {
      const naoVirado = sCards.find( c => c.flipped !== true );      
      if( !naoVirado && exibirVitoria.current ){
        setTimeout( () => alert('Venceu!'), 800 )
        exibirVitoria.current = false;
      }
    }
  }, [sCards] );
  

  if( modoDeJogo === 'tempo' ) {

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

          tentativas.current = 0;
        }else{
          desvirarCard.current = true;
        }

        setMovimentos( movimentos + 1 );

        if( modoDeJogo === 'movimento' && !achouUmPar) tentativas.current = tentativas.current + 1;
      }
      return card;
    } );

    setSCards( novoEstado );
  }

  const handleMaximo = () => {
    useEffect( () => {
      if( tentativas.current >= 10 ){
        setTimeout( () =>{
          alert('Perdeu!');
          handleReset();
        }, 800 )
        
      }

    }, [movimentos] );
  }

  if( modoDeJogo === 'movimento' ) handleMaximo();

  return( 
    <>
      <div className="modo-jogo">

        { modoDeJogo === 'tempo' && <Temporizador tempo={30} handleResetar={ handleReset } /> }        
        { modoDeJogo === 'movimento' && <p>Tentativas: {tentativas.current}</p> }        
      </div>
      <div className="info">              
        <p>Movimentos: {movimentos}</p>
        <button id='resetar' onClick={handleReset}>🔁</button>
      </div>
      <div className="grid">
        {
          sCards.map( c => <Card { ...c } key={c.id} handleClick={ handleClick }/>)
        }
      </div>
    </>
  )
}