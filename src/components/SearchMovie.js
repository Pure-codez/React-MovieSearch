import React, { useState } from 'react'
import MovieCard from './MovieCard';

function SearchMovie() {
    const [query, setQuery]= useState ('');
    const [movies, setMovies]= useState ([]);

    const searchMovies= async (e)=>{
        e.preventDefault();

        const url= `https://api.themoviedb.org/3/search/movie?api_key=5dcf7f28a88be0edc01bbbde06f024ab&language=en-US&query=${query}&page=1&include_adult=false`;

        try{
            const res= await fetch(url);
            const data= await res.json();
            setMovies(data.results);
        }catch(err){
            console.error(err);
        }
        
    }
    // let value, name;
    // function handleChange(e){
    //     value= e.target.value;
    //     setQuery({...setQuery, [name]: value});
    // };
  return (
    <div>
        <form className='form' onSubmit={searchMovies}>
            <label htmlFor='query' className='label'>Movie Name: </label>
            <input
                className='input'
                type="text"
                name='query'
                placeholder='i.e Jurasic Park' 
                value={query}
                onChange={(e)=> setQuery(e.target.value)}
                // onChange={handleChange}
            />
            <button className='button' type='submit'>Search Movie</button> 
        </form>

        <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                   <MovieCard movie={movie} key={movie.id} />
                ))}
        </div>  
    </div>
  )
}

export default SearchMovie