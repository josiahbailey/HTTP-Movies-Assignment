import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from './Movies/MovieForm'
import axios from 'axios';

const App = () => {
   const [savedList, setSavedList] = useState([]);
   const [movieList, setMovieList] = useState([]);
   const [isEditing, setIsEditing] = useState(false)

   const toggleEditing = bool => {
      console.log(isEditing)
      setIsEditing(bool)
   }

   const getMovieList = () => {
      axios
         .get("http://localhost:5000/api/movies")
         .then(res => setMovieList(res.data))
         .catch(err => console.log(err.response));
   };

   const addToSavedList = movie => {
      setSavedList([...savedList, movie]);
   };

   const addToMovieList = movies => {
      setMovieList(movies);
   };

   useEffect(() => {
      getMovieList();
   }, [movieList]);

   return (
      <>
         <SavedList toggleEditing={toggleEditing} list={savedList} />

         <Route exact path="/">
            <MovieList movies={movieList} />
         </Route>

         <Route exact path="/movies/:id">
            <Movie toggleEditing={toggleEditing} addToMovieList={addToMovieList} addToSavedList={addToSavedList} />
         </Route>

         <Route exact path="/add-movies">
            <MovieForm isEditing={isEditing} toggleEditing={toggleEditing} addToMovieList={addToMovieList} />
         </Route>

         <Route exact path="/update-movies/:id">
            <MovieForm isEditing={isEditing} toggleEditing={toggleEditing} addToMovieList={addToMovieList} />
         </Route>
      </>
   );
};

export default App;
