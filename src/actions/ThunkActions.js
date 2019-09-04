import axios from "axios";
import * as SearchActions from "./SearchActions";
import * as MovieActions from "./MovieActions";




/**
 * THUNK ACTION TO RETREIVE ALL IMDB ID MOVIE DETAILS.
 */
export const fetchImdbInformation = url => {
  return dispatch => {
    axios
      .all(url)
      .then(data => {
        dispatch(SearchActions.isLoading(true));
        let temp = data.map(res => res.data);
        dispatch(MovieActions.getImdbInformation(temp));
        dispatch(SearchActions.isLoading(false));
      })
      .catch(err => {
        dispatch(SearchActions.searchError(true));
        console.error("There was an error fetching imdb information", err.code);
      });
  }
}

/**
 * THUNK ACTION TO GET MOVIE_DETAILS AND IMDB_IDS FROM THE API. 
 */
export const fetchMovieDetails = url => {
  return dispatch => {
    axios
      .all(url)
      .then(data => {
        dispatch(SearchActions.isLoading(true));
        let temp = data.map(res => res.data);
        dispatch(MovieActions.getMovieDetails(temp));
        dispatch(MovieActions.getImdbIds(temp));
        dispatch(SearchActions.isLoading(false));
      })
      .catch(err => {
        dispatch(SearchActions.searchError(true));
        console.error("There was an error fetching movie details and ids", err.code);
      });
  };
};

/**
 * THUNK ACTION TO FRONTLOAD SEARCH DATA AS WELL AS POSTER URLS.
 */
export const fetchData = url => {
  return dispatch => {
    dispatch(SearchActions.isLoading(true));
    axios(url)
      .then(res => {
        dispatch(SearchActions.searchSuccess(res.data, res.data.results));
        dispatch(MovieActions.getPosterUrl(res.data.results));
        dispatch(SearchActions.isLoading(false));
      })
      .catch(err => {
        dispatch(SearchActions.searchError(true));
        console.error(err);
      });
  };
};
