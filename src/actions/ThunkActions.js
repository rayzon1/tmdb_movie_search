import axios from "axios";
import * as SearchActions from "./SearchActions";
import * as MovieActions from "./MovieActions";


/**
 * THUNK ACTION TO RETREIVE ALL IMDB ID MOVIE DETAILS.
 */
export const fetchImdbInformation = (url1, url2) => {
  return dispatch => {
    axios
      .all(url1)
      .then(data => {        
        let temp = data.map(res => res.data);
        dispatch(MovieActions.getImdbInformation(temp, 'topRated'));      
      })
      axios.all(url2)
      .then(data => {        
        let temp = data.map(res => res.data);
        dispatch(MovieActions.getImdbInformation(temp, 'popular'));      
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
export const fetchMovieDetails = (url1, url2) => {
  return dispatch => {
    axios
      .all(url1)
      .then(data => {
        let temp = data.map(res => res.data);
        dispatch(MovieActions.getMovieDetails(temp, false));
        dispatch(MovieActions.getImdbIds(temp, false));
      })
      axios.all(url2)
      .then(data =>{
        let temp = data.map(res => res.data);
        dispatch(MovieActions.getMovieDetails(false, temp));
        dispatch(MovieActions.getImdbIds(false, temp));
      })
      .catch(err => {
        dispatch(SearchActions.searchError(true));
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
    dispatch(SearchActions.isLoading(true));
    axios
      .all(url)
      .then(axios.spread((top, pop) => {
        dispatch(SearchActions.getCategoryData(top.data, pop.data));
        dispatch(SearchActions.getMovieIds(top.data.results, pop.data.results));
        dispatch(MovieActions.getPosterUrl(top.data.results, pop.data.results));
        dispatch(SearchActions.isLoading(false));
      }))
      .catch(err => {
        dispatch(SearchActions.searchError(true));
        console.error(err);
      });
  };
};
