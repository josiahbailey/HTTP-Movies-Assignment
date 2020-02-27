import React from 'react';

const MovieCard = ({ movie, edit, removeStar }) => {
   const { title, director, metascore, stars } = movie;
   return (
      <div className="movie-card">
         <h2>{title}</h2>
         <div className="movie-director">
            Director: <em>{director}</em>
         </div>
         <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
         </div>
         <h3>Actors</h3>

         {stars !== undefined &&
            stars.map(star => (
               <div key={star} className="movie-star">
                  {star}
                  {edit ? <button onClick={() => removeStar(star)} className='star-button'>X</button> : ''}
               </div>
            ))}
         {stars === undefined &&
            <p>Add New Stars!</p>
         }
      </div>
   );
};

export default MovieCard;
