import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Home from './containers/Home';
import { HashRouter, Route, Switch } from "react-router-dom";
import { fetchData, fetchMovieDetails, fetchImdbInformation } from "./actions/ThunkActions";
import * as AppLogic from './exports/appLogic';
import { useDispatch, useSelector } from 'react-redux';


function App() {

  const movieIds = useSelector(state => state.search.movieIds);
  const imdbIds = useSelector(state => state.movie.imdbIds);

  const dispatch = useDispatch();

  /**
   * FRONT-LOADS data and movie urls
   */
  useEffect(() => {
    dispatch(fetchData(AppLogic.createUrls(AppLogic.categories, AppLogic.movieUrls)));
  }, [dispatch]);

  /**
   * Obtains Movie Ids per category.
   */
  useEffect(() => {
    movieIds.popular.length > 1 &&
    dispatch(fetchMovieDetails(
      AppLogic.createUrls(movieIds.topRated, AppLogic.movieUrls),
      AppLogic.createUrls(movieIds.popular, AppLogic.movieUrls)
    ));
  }, [movieIds, dispatch])

  /**
   * Obtaines IMDB information per category.
   */
  useEffect(() => {
    imdbIds.popularIds.length > 1 &&
    dispatch(fetchImdbInformation(
      AppLogic.createUrls(imdbIds.topRatedIds, AppLogic.imdbUrls),
      AppLogic.createUrls(imdbIds.popularIds, AppLogic.imdbUrls)
    ));
  }, [imdbIds, dispatch])

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
