import * as MovieActionTypes from '../actiontypes/MovieActionTypes';

const initialState = {
    url: [],
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
        default:
            return state;
    }
}

