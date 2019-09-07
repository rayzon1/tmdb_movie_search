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

  const topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${authToken}&language=en-US&page=1`;
  const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${authToken}&language=en-US&page=1`;

  const topRatedIds = useSelector(state => state.search.movieIds.topRated);
  const popularIds = useSelector(state => state.search.movieIds.popular);

  const topRatedImdbIds = useSelector(state => state.movie.imdbIds.topRatedIds);
  const popularImdbIds = useSelector(state => state.movie.imdbIds.popularIds);

  const dispatch = useDispatch();

  /**
   * Creates movie categories to put in thunk dispatch.
   */
  const movieUrls = category => {
    return `https://api.themoviedb.org/3/movie/${category}?api_key=${authToken}&language=en-US&page=1`;
  }

  /**
   * FRONT-LOADS data and movie urls
   */
  useEffect(() => {
    const categoryUrls = [
      axios.get(movieUrls('top_rated')),
      axios.get(movieUrls('popular'))
    ]
    dispatch(fetchData(categoryUrls));
  }, [popular, dispatch]);

  /**
   * Obtains Movie Ids per category.
   */
  useEffect(() => {
    popularIds.length > 1 &&
    topRatedIds.length > 1 &&
    dispatch(fetchMovieDetails(
      topRatedIds.map(data => {
        return axios.get(`https://api.themoviedb.org/3/movie/${data}?api_key=${authToken}&language=en-US`);
      }),
      popularIds.map(data => {
        return axios.get(`https://api.themoviedb.org/3/movie/${data}?api_key=${authToken}&language=en-US`);
      })
    ));
  }, [popularIds, topRatedIds])

  /**
   * Obtaines IMDB information per category.
   */
  useEffect(() => {
    topRatedImdbIds.length > 1 &&
    popularImdbIds.length > 1 &&
    dispatch(fetchImdbInformation(
      topRatedImdbIds.map(data => {
        return axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${data}`);
      }),
      popularImdbIds.map(data => {
        return axios.get(`http://www.omdbapi.com/?apikey=${apiKey}&i=${data}`);
      })
    ));
  }, [topRatedImdbIds, popularImdbIds])

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
