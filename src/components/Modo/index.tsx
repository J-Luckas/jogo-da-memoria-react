import './styles.css';

export interface Modo {
  id: string 
}
export const Modo = ( { modo }: { modo: Modo }) => {
  return (
    <div className="modo-de-jogo" key={modo.id}> 
      <img src={`/images/${modo.id}.png`} alt={`Imagem sobre ${modo.id}`} />
      <div className="overlay">
        <p>{modo.id}</p>
      </div>
      
    </div>
  )
}