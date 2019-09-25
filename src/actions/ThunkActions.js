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
import {
  categories,
  setAsyncThen,
} from "../exports/ThunkActionsLogic";
import { getVideoKeys } from "./VideoTrailerActions";
import { getMediaNews } from "./MediaNewsActions";

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
    );
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

const categoryHold = {};

//TODO: Create multiple axios calls. One for each category is needed.
export const fetchVideoKeys = (topRated, popular, upcoming, nowPlaying) => {
  return dispatch => {
    axios
      .all(topRated)
      .then(
        top =>
          (categoryHold.topRated = top.map(data =>
            data.data
          ))
      );
    axios
      .all(popular)
      .then(
        pop =>
          (categoryHold.popular = pop.map(data =>
            data.data
          ))
      );
    axios
      .all(upcoming)
      .then(
        up =>
          (categoryHold.upcoming = up.map(data =>
            data.data
          ))
      );
    axios
      .all(nowPlaying)
      .then(
        now =>
          (categoryHold.nowPlaying = now.map(data =>
            data.data
          ))
      )
      .then(setTimeout(() => console.log(categoryHold.topRated), 1))
      .then(setTimeout(() => {
        dispatch(getVideoKeys(categoryHold))
        dispatch(isLoading(false));
      }, 500))
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
            getMovieIds(
              top.data.results,
              pop.data.results,
              up.data.results,
              now.data.results
            )
          );
          dispatch(
            getPosterUrl(
              top.data.results,
              pop.data.results,
              up.data.results,
              now.data.results
            )
          );
        })
      )
      .catch(err => {
        dispatch(searchError(true));
        console.error(err);
      });
  };
};

export const fetchMovieNews = url => {

  return dispatch => {
    axios
      .get(url)
      .then(data => {
        dispatch(getMediaNews(data))
      })
      .catch(err => {
        dispatch(searchError(true));
        console.error(err);
      });
  }
}
