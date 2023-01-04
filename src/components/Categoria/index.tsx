import './styles.css';

export interface Item {
  id: string 
}
export const Categoria = ( { item }: { item: Item }) => {
  return (
    <div className="categoria" key={item.id}> 
      <img src={`/images/${item.id}.png`} alt={`Imagem sobre ${item.id}`} />
      <div className="overlay">
        <p>{item.id}</p>
      </div>
      
    </div>
  )
}