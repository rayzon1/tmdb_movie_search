import * as MovieActionTypes from "../actiontypes/MovieActionTypes";

export const getPosterUrl = (items1, items2) => {
  return {
    type: MovieActionTypes.GET_POSTER_URL,
    items1,
    items2
  };
};

export const getMovieDetails = (arr1, arr2) => {
  return {
    type: MovieActionTypes.GET_MOVIE_DETAILS,
    arr1,
    arr2
  }
}

export const getImdbIds = (items1, items2) => {
  return {
    type: MovieActionTypes.GET_IMDB_IDS,
    items1,
    items2
  }
}

export const getImdbInformation = (items1, items2) => {
  return {
    type: MovieActionTypes.GET_IMDB_INFORMATION,
    items1,
    items2
  }
}