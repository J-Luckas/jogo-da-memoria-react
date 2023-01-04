import { BrowserRouter } from 'react-router-dom';
import { GlobalRoute } from '../../routes/GlobalRoute';

export function App() {
  
  return ( 
    <BrowserRouter>
      < GlobalRoute />
    </BrowserRouter>    
  );
}

