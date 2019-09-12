import axios from "axios";
import {
  isLoading,
  searchError,
  getMovieIds,
  getCategoryData
} from "./SearchActions";
import {
  getPosterUrl,
  getMovieDetails,
  getImdbIds,
  getImdbInformation
} from "./MovieActions";
import { categories, setAsyncThen } from '../exports/ThunkActionsLogic';

/**
 * THUNK ACTION                                                                                                                                                    N TO RETREIVE ALL IMDB ID MOVIE DETAILS.
 */
export const fetchImdbInformation = urlArray => {
  return dispatch => {
    setAsyncThen(
      urlArray,
      true,
      false,
      categories,
      dispatch,
      getImdbInformation
    )
  };
};

export const fetchMovieDetails = urlArray => {
  return dispatch => {
    setAsyncThen(
      urlArray,
      true,
      true,
      categories,
      dispatch,
      getMovieDetails,
      getImdbIds
    );
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
      .then(
        axios.spread((top, pop, up, now) => {
          dispatch(getCategoryData(top.data, pop.data, up.data, now.data));
          dispatch(
            getMovieIds(top.data.results, pop.data.results, up.data.results, now.data.results)
          );
          dispatch(
            getPosterUrl(top.data.results, pop.data.results, up.data.results, now.data.results)
          );
          dispatch(isLoading(false));
        })
      )
      .catch(err => {
        dispatch(searchError(true));
        console.error(err);
      });
  };
};
