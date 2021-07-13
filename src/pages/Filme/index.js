import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';
import './filme-info.css';

export default function Filme() {
 
    const {id} = useParams();
    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        async function loadApi(){
            const response = await api.get(`r-api/?api=filmes/${id}`);
            setFilme(response.data);
            setLoading(false);

            if(response.data.length === 0){
                history.replace('/');
            }
        }

        loadApi();

    }, [id])

   
   
   
   
    function salvaFilme(){
        const minhaLista = localStorage.getItem('filmes'); 

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.error('filme ja foi salvo');
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
        toast.success('filme salvo com sucesso');

        
    }





    if(loading){
        return(
            <h1>Carregando seu filme...</h1>
        )
    }





    return (
   <div className="filme-info">
       <h1>{filme.nome}</h1>
       <img src={filme.foto} alt={filme.nome} />
       <h3>Sinopse</h3>
       {filme.sinopse}
       
       <div>
           <button onClick={ salvaFilme }>Salvar</button>
           <button>
               <a  target="blank" href={`https://www.youtube.com/results?search_query=${filme.nome} Trailer`}>Trailer</a>
           </button>
       </div>
   </div>
 );
}