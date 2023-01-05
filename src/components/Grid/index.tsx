import './styles.css';
import { Card, CardProps } from "../Card";
import { embaralharCards } from '../../utils/card';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export interface GridProps {
  cards: CardProps[];
}

const TEMPO_MAXIMO = 30;

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

  const [ cronometro, setCronometro ] = useState(TEMPO_MAXIMO);
  const [ podeJogar, setPodeJogar ] = useState(false);


  const handleReset = () => {
    setSCards( embaralharCards( cards ) );
    primeiroCard.current = null;
    segundoCard.current = null;
    desvirarCard.current = false; 
    exibirVitoria.current = true;   
    setMovimentos(0);
    tentativas.current = 0;
    setCronometro(TEMPO_MAXIMO);
    setPodeJogar(false);
    clearInterval(id.current.intervalo);
  }

  useEffect( () => {
    if ( sCards.length > 0 ) {
      const naoVirado = sCards.find( c => c.flipped !== true );      
      if( !naoVirado && exibirVitoria.current ){
        setTimeout( () =>{
          alert('Venceu!');
          handleReset();
        }, 800 )
        exibirVitoria.current = false;
      }
    }
  }, [sCards] );

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
        exibirVitoria.current = false;
        desvirarCards();
        setTimeout( () =>{
          alert('Perdeu!');
          handleReset();
        }, 200);
      }

    }, [movimentos] );
  }

  if( modoDeJogo === 'movimento' ) handleMaximo();
  
  const id = useRef<{intervalo: NodeJS.Timer}>({ intervalo: 0 as unknown as NodeJS.Timer });
  const clear=()=>{
    clearInterval(id.current.intervalo);
  }

  const iniciarTimer = () => {
    if( podeJogar === true ) return clearInterval(id.current.intervalo);
    id.current.intervalo = setInterval(()=>{
      
      setCronometro((time)=>time-1)
    },1000);
    
    return ()=>clear();
  }
  
  useEffect( () => {
    if( cronometro <= 0 ){ 
      exibirVitoria.current = false;
      desvirarCards();      
      
      setTimeout( () => {
        alert('O tempo acabou!')
        handleReset();
      }, 200);
      
    }
  },[ cronometro ] )  


  const exibirBotaoComecar = () => {
    if( podeJogar === false && modoDeJogo === 'tempo' ){
      return <button
        className='controles'
        onClick={ () => { 
          iniciarTimer();
          setPodeJogar(true);
        }
      }>▶️</button>;
    } else if (podeJogar === true && modoDeJogo === 'tempo'){
      return <button 
        className='controles'        
        onClick={ () =>{
          iniciarTimer();
          setPodeJogar(false);
        }
      }>⏸️</button>;
    }

    return;
  }

  const desvirarCards = () => setSCards( 
    sCards.map( (c) =>{
      c.flipped = true;
      return c;
    } ) 
  );
  
  return( 
    <>
      <div className="modo-jogo">

        { modoDeJogo === 'tempo' && <p>Tempo: {cronometro}</p> }        
        { modoDeJogo === 'movimento' && <p>Tentativas: {tentativas.current}</p> }        
      </div>
      <div className="info">              
        <p>Movimentos: {movimentos}</p>
        <button className='controles' id='resetar' onClick={handleReset}>🔁</button>
        {exibirBotaoComecar()}
      </div>
      <div className="grid">
        {
          sCards.map( c => <Card { ...c } key={c.id} handleClick={ handleClick } habilitado={ modoDeJogo === 'tempo' ? podeJogar : true } />)
        }
      </div>
    </>
  )
}