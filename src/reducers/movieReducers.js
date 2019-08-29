import * as MovieActionTypes from '../actiontypes/MovieActionTypes';


//! https://image.tmdb.org/t/p/w500


const initialState = {
    url: [],
    movieDetails: []
}

/**
 *  this will be the main movie state for gathering urls, images, anything it needs.
 */
export default function movieReducer(state = initialState, action) {
    switch (action.type) {
        case MovieActionTypes.GET_POSTER_URL:
            return {
                ...state,
                url: action.items.map(res => {
                    return res.backdrop_path;
                }),
            }
        
        case MovieActionTypes.GET_MOVIE_DETAILS:
            return {
                ...state,
                movieDetails: [action.items]
            }

        default:
            return state;
    }
}

