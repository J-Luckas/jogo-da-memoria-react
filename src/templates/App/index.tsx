import { useEffect, useState } from 'react';
import { CardProps } from '../../components/Card';
import { Grid } from '../../components/Grid';
import './styles.css'

export function App() {

  const [ cards, setCards ] = useState<CardProps[] | null>(null);

  useEffect( () => {
    async function requisicaoAnimais() {
      let response = await fetch('http://localhost:3333/animais')
      const animais: CardProps[] = await response.json()
      setCards(animais);
    }

    requisicaoAnimais();   
    
  },[] )
  
  
  return cards && ( 
    <div className="app">
      <Grid cards={cards}/>
    </div>
  );
}

