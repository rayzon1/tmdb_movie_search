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

export const getMovieIds = (id1, id2) => {
    return {
        type: SearchActionTypes.MOVIE_IDS,
        id1,
        id2
    }
}

export const getCategoryData = (data1, data2) => {
    return {
        type: SearchActionTypes.CATEGORY_DATA,
        data1,
        data2
    }
}

