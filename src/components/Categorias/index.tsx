import './styles.css';
import { useEffect, useState } from "react"
import { Categoria } from '../Categoria';
import { Link } from 'react-router-dom';

export const Categorias = () => {

  const [data, setData ] = useState({ categorias: [] });
  useEffect( () => {
    async function getCategorias(): Promise<void> {
      const result = await fetch(`http://localhost:3333/categorias`);

      setData({ categorias: await result.json() });
    }

    getCategorias();
  }, [])

  return (
    <div className="categorias">
      <div className="info-categorias">
        Selecione uma categoria
      </div>
      <div className="lista-categorias">
        {data.categorias.map((item: any) => (
          <Link key={item.id} to={`categoria/${item.id}`}>   
            < Categoria key={item.id} item={ item } />
          </Link>
        ))}
      </div>
    </div>
  )
}