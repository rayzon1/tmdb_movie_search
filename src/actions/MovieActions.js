import * as MovieActionTypes from "../actiontypes/MovieActionTypes";

export const getPosterUrl = (items1, items2, items3) => {
  return {
    type: MovieActionTypes.GET_POSTER_URL,
    items1,
    items2,
    items3
  };
};

export const getMovieDetails = (arr, category) => {
  return {
    type: MovieActionTypes.GET_MOVIE_DETAILS,
    arr,
    category
  }
}

export const getImdbIds = (items, category) => {
  return {
    type: MovieActionTypes.GET_IMDB_IDS,
    items,
    category
  }
}

export const getImdbInformation = (items, category) => {
  return {
    type: MovieActionTypes.GET_IMDB_INFORMATION,
    items,
    category
  }
}