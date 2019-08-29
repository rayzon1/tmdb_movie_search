import * as MovieActionTypes from "../actiontypes/MovieActionTypes";

export const getPosterUrl = items => {
  return {
    type: MovieActionTypes.GET_POSTER_URL,
    items
  };
};

export const getMovieDetails = items => {
  return {
    type: MovieActionTypes.GET_MOVIE_DETAILS,
    items
  }
}