import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
   return (
      <div className="movie-list">
         {movies.length > 0 &&
            movies.map(movie => (
               <Link key={movie.id} to={`/movies/${movie.id}`}>
                  <MovieCard movie={movie} />
               </Link>
            ))
         }
         {movies.length === 0 &&
            <h1>Add More Movies</h1>
         }
      </div>
   );
}

export default MovieList;
