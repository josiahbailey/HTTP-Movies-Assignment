import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, addToMovieList }) {
   const [movie, setMovie] = useState(null);
   const match = useRouteMatch();
   const history = useHistory()

   const fetchMovie = id => {
      axios
         .get(`http://localhost:5000/api/movies/${id}`)
         .then(res => setMovie(res.data))
         .catch(err => console.log(err.response));
   };

   const deleteMovie = id => {
      axios
         .delete(`http://localhost:5000/api/movies/${id}`)
         .then(res => {
            console.log(res)
            addToMovieList(res.data)
         })
         .catch(err => {
            console.log(err)
         })
      history.push('/')
   }

   const saveMovie = () => {
      addToSavedList(movie);
   };

   useEffect(() => {
      fetchMovie(match.params.id);
   }, [match.params.id]);

   if (!movie) {
      return <div>Loading movie information...</div>;
   }

   return (
      <div className='save-wrapper'>
         <MovieCard movie={movie} />
         <Link to={`/update-movie/${movie.id}`}>
            <div className='update-button'>
               Update
            </div>
         </Link>

         <div className='save-button' onClick={saveMovie}>
            Save
         </div>

         <div onClick={() => deleteMovie(movie.id)} className='delete-button'>
            X
            </div>
      </div>
   );
}

export default Movie;
