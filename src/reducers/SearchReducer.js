import * as SearchActionTypes from '../actiontypes/SearchActionTypes';

// !Create reducer to get configuration url for images 
// !Requires base_url, size and file path fields to generate an image
// !Example: https://image.tmdb.org/t/p/w500/8uO0gUM8aNqYLs1OsTBQiXu0fEv.jpg

const initialState = {
    isLoading: false,
    hasError: false,
    data: {
        topRated: [],
        popular: [],
        upcoming: [],
        nowPlaying: []
    },
    movieIds: {
        topRated: [],
        popular: [],
        upcoming: [],
        nowPlaying: [],
    },

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

        case SearchActionTypes.MOVIE_IDS:
            return {
                ...state,
                movieIds: {
                    topRated: action.id1.map(res => {
                        return res.id;
                    }),
                    popular: action.id2.map(res => {
                        return res.id;
                    }),
                    upcoming: action.id3.map(res => {
                        return res.id;
                    }),
                    nowPlaying: action.id4.map(res => {
                        return res.id;
                    })
                }   
            }

        case SearchActionTypes.CATEGORY_DATA:
            return {
                ...state,
                data: {
                    topRated: [action.data1],
                    popular: [action.data2],
                    upcoming: [action.data3],
                    nowPlaying: [action.data4]    
                },
            }
        
    
        default:
            return state;
    }

}