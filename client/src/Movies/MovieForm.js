import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useRouteMatch, useHistory } from 'react-router-dom'
import MovieCard from './MovieCard'

const MovieForm = ({ addToMoviesList }) => {
   let id = 0
   const history = useHistory()
   const match = useRouteMatch()
   const [star, setStar] = useState('')
   const [movie, setMovie] = useState({
      id: Date.now(),
      title: '',
      director: '',
      metascore: 89,
      stars: []
   })

   const fetchMovie = id => {
      axios
         .get(`http://localhost:5000/api/movies/${id}`)
         .then(res => {
            console.log(res)
            id = res.data.id
            setMovie(res.data)
         })
         .catch(err => console.log(err.response));
   };

   useEffect(() => {
      fetchMovie(match.params.id);
   }, [match.params.id]);

   const handleChange = e => {
      setMovie({
         ...movie,
         [e.target.name]: e.target.value
      })
   }

   const addMovieStar = e => {
      e.preventDefault()
      setMovie({
         ...movie,
         stars: [...movie.stars, star]
      })
   }

   const changeStarName = e => {
      setStar(e.target.value)
   }

   const handleSubmit = e => {
      e.preventDefault()
      axios.put(`http://localhost:5000/api/movies/${id}`, movie)
         .then(res => {
            console.log(res)
            addToMoviesList(res.data)
         })
         .catch(err => {
            console.log(err)
         })
      setMovie({
         id: Date.now(),
         title: '',
         director: '',
         metascore: 89,
         stars: []
      })
      history.push('/')

   }

   return (
      <>
         <form onSubmit={handleSubmit}>
            <input onChange={handleChange} type='text' name='title' value={movie.title} placeholder='movie title' />
            <input onChange={handleChange} type='text' name='director' value={movie.director} placeholder='director' />
            <input onChange={handleChange} type='number' name='metascore' value={movie.metascore} placeholder='metascore' />
            <button type='submit'>Update Movie</button>
         </form>
         <form onSubmit={addMovieStar}>
            <h3>Add Movie Stars</h3>
            <input onChange={changeStarName} type='text' placeholder='Star name' />
         </form>
         <h2>Preview</h2>
         <MovieCard movie={movie} />
      </>
   );
}

export default MovieForm;