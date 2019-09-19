import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./containers/Home";
import { HashRouter, Route, Switch } from "react-router-dom";
import {
  fetchData,
  fetchMovieDetails,
  fetchImdbInformation,
  fetchVideoKeys
} from "./actions/ThunkActions";
import {
  movieUrls,
  imdbUrls,
  categories,
  createUrls,
  sendUrls,
  movieIdArray,
  imdbIdArray,
  videoUrls
} from "./exports/AppLogic";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const movieIds = useSelector(state => state.search.movieIds);
  const imdbIds = useSelector(state => state.movie.imdbIds);

  const dispatch = useDispatch();

  /**
   * FRONT-LOADS data and movie urls
   */
  useEffect(() => {
    dispatch(fetchData(createUrls(categories, movieUrls)));
  }, [dispatch]);

  /**
   * Obtains Movie Ids per category.
   */
  useEffect(() => {
    movieIds.popular.length > 1 &&
      movieIds.nowPlaying.length > 1 &&
      movieIds.upcoming.length > 1 &&
      movieIds.topRated.length > 1 &&
      dispatch(fetchMovieDetails(sendUrls(movieIdArray(movieIds), movieUrls)));
  }, [
    movieIds.nowPlaying,
    movieIds.popular,
    movieIds.upcoming,
    movieIds.topRated
  ]);

  /**
   * Obtaines IMDB information per category.
   */
  
  useEffect(() => {
    imdbIds.popularIds.length > 1 &&
      imdbIds.topRatedIds.length > 1 &&
      imdbIds.upcomingIds.length > 1 &&
      imdbIds.nowPlayingIds.length > 1 &&
      dispatch(fetchImdbInformation(sendUrls(imdbIdArray(imdbIds), imdbUrls)));
  }, [
    imdbIds.topRatedIds,
    imdbIds.popularIds,
    imdbIds.nowPlayingIds,
    imdbIds.upcomingIds
  ]);


  useEffect(() => {
    movieIds.popular.length > 1 &&
    movieIds.topRated.length > 1 &&
    movieIds.upcoming.length > 1 &&
    movieIds.nowPlaying.length > 1 &&
      setTimeout(() => {
        dispatch(
          fetchVideoKeys(
           [...createUrls(movieIds.topRated, videoUrls)], 
           [...createUrls(movieIds.popular, videoUrls)],
           [...createUrls(movieIds.upcoming, videoUrls)],
           [...createUrls(movieIds.nowPlaying, videoUrls)],
          )
        );
      }, 2000);
  }, [
    movieIds.topRated,
    movieIds.popular,
    movieIds.nowPlaying,
    movieIds.upcoming
  ]);

  return (
    <HashRouter>
      <Switch>
        <div className="App">
          <NavBar />
          <Route exact path="/" render={() => <p>Sign In Page</p>} />
          <Route exact path="/home" render={() => <Home />} />
        </div>
      </Switch>
    </HashRouter>
  );
}

export default App;
