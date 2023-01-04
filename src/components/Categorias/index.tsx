import './styles.css';
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Categoria } from '../Categoria';

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
      {data.categorias.map((item: any) => (
        < Categoria item={ item } />
      ))}
    </div>
  )
}