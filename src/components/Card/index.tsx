import './styles.css';

export interface CardProps {
  id: string;
  flipped?: boolean;
  conteudo: string;

  handleClick?: (id: string) => void;

  habilitado?: boolean;
}

export function Card({ flipped = false, conteudo, handleClick, id, habilitado = true }: CardProps) {

  const nomesDasClasses = [ 'conteudo_card' ]
  flipped && nomesDasClasses.push('conteudo_card_flipped')

  const handleClickFuncao = () =>{
    if( handleClick && habilitado ){
      handleClick( id );
    }
  }

  return (
    <div className="card" onClick={ handleClickFuncao }>
      <div className={ nomesDasClasses.join(' ') }>
        <div className="foto_card foto_card_front">
          ?
        </div>
        <div className="foto_card foto_card_back">
          { conteudo }
        </div>
      </div>
    </div>
  )
}