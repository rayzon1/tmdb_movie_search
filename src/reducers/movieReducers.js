import * as MovieActionTypes from '../actiontypes/MovieActionTypes';


//! https://image.tmdb.org/t/p/w500


const initialState = {
    url: {
        topRated: [],
        popular: [],
    },
    details: {
        topRatedDetails: [],
        popularDetails: []
    },
    imdbIds: {
        topRatedIds: [],
        popularIds: []
    },
    imdbInformation: {
        topRatedImdb: [],
        popularImdb: []
    }
}

/**
 *  this will be the main movie state for gathering urls, images, anything it needs.
 */
export default function movieReducer(state = initialState, action) {
    switch (action.type) {
        case MovieActionTypes.GET_POSTER_URL:
            return {
                ...state,
                url: {
                    topRated: action.items1.map(res => {
                        return res.backdrop_path;
                    }),
                    popular: action.items2.map(res => {
                        return res.backdrop_path;
                    })
                }
            }
      
        case MovieActionTypes.GET_MOVIE_DETAILS:
            return {
                ...state,
                details: {
                    topRatedDetails: action.arr1 ? [action.arr1] : [...state.details.topRatedDetails],
                    popularDetails: action.arr2 ? [action.arr2] : [...state.details.popularDetails]
                }
            }

        case MovieActionTypes.GET_IMDB_IDS:
            return {
                ...state,
                imdbIds: {
                    topRatedIds: action.items1 ? action.items1.map(res => {
                        return res.imdb_id;
                    }) : [...state.imdbIds.topRatedIds],
                    popularIds: action.items2 ? action.items2.map(res => {
                        return res.imdb_id;
                    }) : [...state.imdbIds.popularIds],
                }
                
                
            }
        
        case MovieActionTypes.GET_IMDB_INFORMATION:
            return {
                ...state,
                imdbInformation: {
                    topRatedImdb: action.category === 'topRated' ? [action.items] : [...state.imdbInformation.topRatedImdb],
                    popularImdb: action.category === 'popular' ? [action.items] : [...state.imdbInformation.popularImdb]
                }
            }

        default:
            return state;
    }
}

