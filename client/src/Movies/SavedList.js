import React from 'react';
import { NavLink, Link } from 'react-router-dom';

function SavedList({ list, toggleEditing }) {
   return (
      <>
         <div className="saved-list">
            <h3>Saved Movies:</h3>
            {list.map(movie => {
               return (
                  <NavLink
                     to={`/movies/${movie.id}`}
                     key={movie.id}
                     activeClassName="saved-active"
                  >
                     <span className="saved-movie">{movie.title}</span>
                  </NavLink>
               );
            })}
         </div>
         <div className='links'>
            <div className="home-button">
               <Link onClick={() => toggleEditing(false)} to='/add-movies' >Add Movie</Link>
            </div>
            <div className="home-button">
               <Link onClick={() => toggleEditing(false)} to="/">Home</Link>
            </div>
         </div>
      </>
   );
}

export default SavedList;
