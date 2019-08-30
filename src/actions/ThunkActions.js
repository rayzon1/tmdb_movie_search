import axios from "axios";
import * as SearchActions from "./SearchActions";
import * as MovieActions from "./MovieActions";

export const fetchMovieDetails = url => {
  return dispatch => {
    axios
      .all(url)
      .then(data => {
        dispatch(SearchActions.isLoading(true));
        let temp = data.map(res => res.data);
        dispatch(MovieActions.getMovieDetails(temp));
        dispatch(SearchActions.isLoading(false));
      })
      .catch(err => {
        dispatch(SearchActions.searchError(true));
        console.error(err);
      });
  };
};

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
