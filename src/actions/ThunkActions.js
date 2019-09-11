import axios from "axios";
import { isLoading, searchError, getMovieIds, getCategoryData } from "./SearchActions";
import { getPosterUrl, getMovieDetails, getImdbIds, getImdbInformation } from "./MovieActions";


const manageResults = (items, category, func, action) => {
  let temp = items.map(res => res.data);
  return func(action(temp, category));  
}

const asyncThen = (url, dis1, dis2, category, func, action, action2) => {
    return url.then(data => {
      dis1 && manageResults(data, category, func, action)
      dis2 && manageResults(data, category, func, action2 || action)
    }) 
}

/**
 * THUNK ACTION                                                                                                                                                    N TO RETREIVE ALL IMDB ID MOVIE DETAILS.
 */
export const fetchImdbInformation = (url1, url2, url3) => {
  return dispatch => {
      asyncThen(axios.all(url1), true, false, 'topRated', dispatch, getImdbInformation)
      asyncThen(axios.all(url2), true, false, 'popular', dispatch, getImdbInformation)
      asyncThen(axios.all(url3), true, false, 'upcoming', dispatch, getImdbInformation)
      .catch(err => {
        dispatch(searchError(true));
        console.error("There was an error fetching imdb information", err.code);
      });
  }
}

/**
 * THUNK ACTION TO GET MOVIE_DETAILS AND IMDB_IDS FROM THE API. 
 */
export const fetchMovieDetails = (url1, url2, url3) => {
  return dispatch => {
      asyncThen(axios.all(url1), true, true, 'topRated', dispatch, getMovieDetails, getImdbIds)
      asyncThen(axios.all(url2), true, true, 'popular', dispatch, getMovieDetails, getImdbIds)
      asyncThen(axios.all(url3), true, true, 'upcoming', dispatch, getMovieDetails, getImdbIds)
      .catch(err => {
        dispatch(searchError(true));
        console.error("There was an error fetching movie details and ids", err.code);
      });
  };
};

/**
 * THUNK ACTION TO FRONTLOAD SEARCH DATA AS WELL AS POSTER URLS.
 * 
 * axios.all => axios.spread into redux store for each category, popular/toprated etc.
 */
export const fetchData = url => {
  return dispatch => {
    dispatch(isLoading(true));
    axios
      .all(url)
      .then(axios.spread((top, pop, up) => {
        dispatch(getCategoryData(top.data, pop.data, up.data));
        dispatch(getMovieIds(top.data.results, pop.data.results, up.data.results));
        dispatch(getPosterUrl(top.data.results, pop.data.results, up.data.results));
        dispatch(isLoading(false));
      }))
      .catch(err => {
        dispatch(searchError(true));
        console.error(err);
      });
  };
};
