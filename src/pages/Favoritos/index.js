import {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './style.css';

export default function Favoritos() {
 
  const [filmes, setFilmes] = useState([]);
  

  useEffect(() => {

    const minhaLista = localStorage.getItem('filmes');

    

    setFilmes(JSON.parse(minhaLista) || [] );



  }, []);

  function handleDelete(id){
    let filtroFilmes = filmes.filter((item) => {
      return (item.id !== id);
    })
      setFilmes(filtroFilmes);
      localStorage.setItem('filmes', JSON.stringify(filtroFilmes));
      toast.error('filme excluido com sucesso');
    
  }
  
 
  return (
   <div id="meus-filmes">
     <h1>Meus Filmes</h1>

    {filmes.length === 0 && <span>Você não possui nenhum filme salvo =(</span>}



     <ul>
       {filmes.map((filme) => {
         return(
         <li key={filme.id}>
           <span>{filme.nome}</span>
           
           
           <div>
           <Link to={`/filme/${filme.id}`}>ver detalhes</Link>
           <button onClick={ ()=> {handleDelete(filme.id)} }>Excluir</button>
           </div>
         </li>
       )
      })}
     </ul>

   </div>
 );
}