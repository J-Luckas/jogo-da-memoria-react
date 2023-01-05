import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { embaralharAleatorio } from '../../utils/embaralhar-aleatorio';
import { CardProps } from '../Card';
import { Grid } from '../Grid';
import './styles.css'

export function Jogo() {

  const [ cards, setCards ] = useState<CardProps[] | null>(null);  
  const { id } = useParams<{id: string}>();

  const navigate = useNavigate();


  useEffect( () => {        
    if( id !== 'aleatorio' ){
      async function requisicaoJogo() {
        let response = await fetch(`https://jogo-da-memoria-server.herokuapp.com/${id}`);
        const resposta: CardProps[] = await response.json();
        setCards(resposta);
      }
      requisicaoJogo();   
    }else{
      async function getCategoriasAleatorio(): Promise<void> {
        const result = await fetch(`https://jogo-da-memoria-server.herokuapp.com/categorias`);

        const categorias = await result.json();

        const embaralhado = await embaralharAleatorio( categorias );
        
        setCards(embaralhado.slice(0, 8));
      }

      getCategoriasAleatorio();
    }
    
  },[id] );
  
  
  return cards && ( 
    <div className="jogo">
      <button id='voltar' title="Voltar" onClick={ () => navigate('/')}>
        ⬅️
      </button>
      <h1>{id}</h1>
      <Grid cards={cards}/>
    </div>
  );
}

