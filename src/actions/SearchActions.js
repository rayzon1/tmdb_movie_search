import * as SearchActionTypes from '../actiontypes/SearchActionTypes';

export const isLoading = bool => {
    return {
        type: SearchActionTypes.LOADING_DATA,
        isLoading: bool
    }
}

export const searchError = bool => {
    return {
        type: SearchActionTypes.SEARCH_ERROR,
        hasErrored: bool
    }
}

export const searchSuccess = (items, id) => {
    return {
        type: SearchActionTypes.SEARCH_SUCCESS,
        items,
        id
    }
}

// export const getPosterUrl = (items) => {
//     return {
//         type: SearchActionTypes.GET_POSTER_URL,
//         items
//     }
// }
