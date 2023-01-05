import { CardProps } from "../components/Card";
import { sortArray } from "./card";

export const embaralharAleatorio = async ( categorias: CardProps[]) => {
  const allCards = categorias.map( async ( c: { id: string} ) => {
    if( c.id === 'aleatorio' ) return;

    const result = await fetch(`https://jogo-da-memoria-server.herokuapp.com/${c.id}`);

    return result.json();
  });

  const pr = await Promise.all(allCards);
  const arrayTotal: CardProps[] = pr.filter( (c) => c !== undefined ).reduce( (arr, cur) => [ ...arr, ...cur ], [] );
  
  return sortArray(arrayTotal);
}