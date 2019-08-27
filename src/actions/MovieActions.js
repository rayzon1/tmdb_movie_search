import * as MovieActionTypes from "../actiontypes/MovieActionTypes";

export const getPosterUrl = items => {
  return {
    type: MovieActionTypes.GET_POSTER_URL,
    items
  };
};
