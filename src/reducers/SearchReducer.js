import * as SearchActionTypes from '../actiontypes/SearchActionTypes';

// !Create reducer to get configuration url for images 
// !Requires base_url, size and file path fields to generate an image
// !Example: https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg

const initialState = {
    isLoading: false,
    hasError: false,
    data: [],
    movieIds: [],

};

export default function SearchReducer(state=initialState, action) {

    switch (action.type) {
        case SearchActionTypes.LOADING_DATA:
            return {
                isLoading: true,
                hasError: false,
                ...state
            }

        case SearchActionTypes.SEARCH_ERROR:
            return {
                isLoading: false,
                hasError: true,
                ...state
            }

        case SearchActionTypes.SEARCH_SUCCESS:
            return {
                ...state,
                data: [action.items],
                movieIds: action.id.map(res => {
                    return res.id;
                })
            }
        
    
        default:
            return state;
    }

}