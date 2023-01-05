import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modo } from '../Modo';
import './styles.css';

export const ModoDeJogo = () => {
  const [data, setData ] = useState({ modos: [] });
  useEffect( () => {
    async function getModos(): Promise<void> {
      const result = await fetch(`https://jogo-da-memoria-server.herokuapp.com/modos`);

      setData({ modos: await result.json() });
    }

    getModos();
  }, [])

  return (
    <div className="modos">
      <div className="info-modos">
        Selecione um modo de jogo
      </div>
      <div className="lista-modos">
        {data.modos.map((modo: any) => (
          <Link key={modo.id} to={`categoria/aleatorio?modo=${modo.id}`} >   
            < Modo key={modo.id} modo={ modo } />
          </Link>
        ))}
      </div>
    </div>
  )
}