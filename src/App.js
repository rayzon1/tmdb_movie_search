import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './containers/Home';
import { HashRouter, Route, Switch } from "react-router-dom";
import { fetchData, fetchMovieDetails, fetchImdbInformation } from "./actions/ThunkActions";
import { authToken, apiKey } from "./config";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';


function App() {

  const searchByMovie = `https://api.themoviedb.org/3/movie/top_rated?api_key=${authToken}&language=en-US&page=1`;
  const movieIds = useSelector(state => state.search.movieIds);
  const imdbIds = useSelector(state => state.movie.imdbIds);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData(searchByMovie));
    
  }, [searchByMovie, dispatch]);

  useEffect(() => {
    movieIds.length > 1 &&
    dispatch(fetchMovieDetails(
      movieIds.map(data => {
        return axios.get(`https://api.themoviedb.org/3/movie/${data}?api_key=${authToken}&language=en-US`);
      })
    ));
  }, [movieIds])

  useEffect(() => {
    imdbIds.length > 1 &&
    dispatch(fetchImdbInformation(
      imdbIds.map(data => {
        return axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${data}`);
      })
    ));
  }, [imdbIds])

  return (
    <HashRouter>
      <Switch>
        <div className="App">
          <NavBar />
          <Route exact path='/' render={() => <p>Sign In Page</p>} />
          <Route exact path='/home' render={() => <Home />} />
        </div>
      </Switch>
    </HashRouter>
  );
}

export default App;
