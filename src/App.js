import React,{useEffect,useState} from "react";
import Movie from "./components/Movie";

require('dotenv').config();

const API_KEY= process.env.REACT_APP_API_KEY;
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

function App() {
  const [movies,setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(()=>{
    getMovies(API_URL);
  },[])

  const getMovies = (API)=>{
      fetch(API).then(res=>res.json())
      .then(data=>{
        setMovies(data.results);
      });
  }
  const handleOnSubmit = (e)=>{
    e.preventDefault();
    if(searchTerm){
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm('');
    }
  };

  const handleOnChange = (e)=>{
    setSearchTerm(e.target.value);
  }
  return (
    <>
      <header>
        <form onSubmit={handleOnSubmit}>
        <input 
        type="search" 
        placeholder="search" 
        className="search"
        value={searchTerm}
        onChange={handleOnChange}
        />
        </form>
      </header>
    <div className="movie-container">
      {movies.length > 0 && movies.map((movie)=>{
        return <Movie key={movie.id} {...movie}/>
      })}
    </div>
    </>
    );
}

export default App;
