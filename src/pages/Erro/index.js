import { Link } from "react-router-dom";
import './erro.css';

export default function Erro() {
 return (
   <div className="not-found">
       <h1>404</h1>
       <h2>Pagina não econtrada!</h2>
       <Link to="/">veja todos os filmes</Link>
   </div>
 );
}