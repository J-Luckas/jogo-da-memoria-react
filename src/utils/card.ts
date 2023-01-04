import { CardProps } from "../components/Card";
import { cards } from "../data/cards";

const gerarId = () =>  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const duplicateArray = <T>( array: T[] ): T[] => [ ...array, ...array ];

export const sortArray = <T>( array: T[] ): T[] => array.sort( () => Math.random() - 0.5 );

export const regerarCard = (cards: CardProps[]): CardProps[] => cards.map( (card) => ({ ...card, id: card.id + gerarId() }) );

export const embaralharCards = (cards: CardProps[]): CardProps[] => sortArray( regerarCard( duplicateArray( cards ) ) );