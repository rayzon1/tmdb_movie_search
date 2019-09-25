import React, { useEffect } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./containers/Home";
import SignIn from "./containers/SignIn";
import LoadingSpinner from "./components/LoadingSpinner";
import { HashRouter, Route, Switch } from "react-router-dom";
import {
  fetchData,
  fetchMovieDetails,
  fetchImdbInformation,
  fetchVideoKeys,
  fetchMovieNews
} from "./actions/ThunkActions";
import {
  movieUrls,
  imdbUrls,
  categories,
  createUrls,
  sendUrls,
  movieIdArray,
  imdbIdArray,
  videoUrls,
  movieNewsUrl
} from "./exports/AppLogic";
import { useDispatch, useSelector } from "react-redux";
import TemporaryDrawer from './components/MenuDrawer';

function App() {
  const movieIds = useSelector(state => state.search.movieIds);
  const imdbIds = useSelector(state => state.movie.imdbIds);
  const searchLoader = useSelector(state => state.search)

  const dispatch = useDispatch();

  /**
   * FRONT-LOADS data and movie urls
   */
  useEffect(() => {
    dispatch(fetchData(createUrls(categories, movieUrls)));
  }, []);

  /**
   * Obtains Movie Ids per category.
   */
  useEffect(() => {
    movieIds.popular.length > 1 &&
      movieIds.nowPlaying.length > 1 &&
      movieIds.upcoming.length > 1 &&
      movieIds.topRated.length > 1 &&
      dispatch(fetchMovieDetails(sendUrls(movieIdArray(movieIds), movieUrls)));
      return  () => {
        console.log('unmounted')
      }
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
      return  () => {
        console.log('unmounted')
      }
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
      }, 1000);
      return  () => {
        console.log('unmounted')
      }
  }, [
    movieIds.topRated,
    movieIds.popular,
    movieIds.nowPlaying,
    movieIds.upcoming
  ]);

  useEffect(() => {
    dispatch(fetchMovieNews(movieNewsUrl('movies')));
  }, [])


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  return (
    <HashRouter>
      <Switch>
        <div className="App">
          <NavBar toggleDrawer={toggleDrawer}/>
          <TemporaryDrawer state={state} setState={setState} toggleDrawer={toggleDrawer}/>
          <Route exact path="/" render={() => <SignIn />} />
          <Route exact path="/home" render={() => searchLoader.isLoading ? <LoadingSpinner /> : <Home />} />
        </div>
      </Switch>
    </HashRouter>
  );
}

export default App;
