import './styles.css';
import { Link } from "react-router-dom";

export interface Item {
  id: string 
}
export const Categoria = ( { item }: { item: Item }) => {
  return (
    <div className="categoria" key={item.id}>
      <Link to={`categoria/${item.id}`}>            
        <div className="overlay">
          {item.id}
        </div>
      </Link>
    </div>
  )
}