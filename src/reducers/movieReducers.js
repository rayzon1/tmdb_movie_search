import * as MovieActionTypes from '../actiontypes/MovieActionTypes';


//! https://image.tmdb.org/t/p/w500


const initialState = {
    url: {
        topRated: [],
        popular: [],
        upcoming: [],
    },
    details: {
        topRatedDetails: [],
        popularDetails: [],
        upcomingDetails: [],
    },
    imdbIds: {
        topRatedIds: [],
        popularIds: [],
        upcomingIds: [],
    },
    imdbInformation: {
        topRatedImdb: [],
        popularImdb: [],
        upcomingImdb: [],
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
                    }),
                    upcoming: action.items3.map(res => {
                        return res.backdrop_path;
                    })
                }
            }
      
        case MovieActionTypes.GET_MOVIE_DETAILS:
            return {
                ...state,
                details: {
                    topRatedDetails: action.category === 'topRated' ? [action.arr] : [...state.details.topRatedDetails],
                    popularDetails: action.category === 'popular' ? [action.arr] : [...state.details.popularDetails],
                    upcomingDetails: action.category === 'upcoming' ? [action.arr] : [...state.details.upcomingDetails]
                }
            }

        case MovieActionTypes.GET_IMDB_IDS:
            return {
                ...state,
                imdbIds: {
                    topRatedIds: action.category === 'topRated' ? action.items.map(res => {
                        return res.imdb_id;
                    }) : [...state.imdbIds.topRatedIds],
                    popularIds: action.category === 'popular' ? action.items.map(res => {
                        return res.imdb_id;
                    }) : [...state.imdbIds.popularIds],
                    upcomingIds: action.category === 'upcoming' ? action.items.map(res => {
                        return res.imdb_id;
                    }) : [...state.imdbIds.upcomingIds],
                }
                
                
            }
        
        case MovieActionTypes.GET_IMDB_INFORMATION:
            return {
                ...state,
                imdbInformation: {
                    topRatedImdb: action.category === 'topRated' ? [action.items] : [...state.imdbInformation.topRatedImdb],
                    popularImdb: action.category === 'popular' ? [action.items] : [...state.imdbInformation.popularImdb],
                    upcomingImdb: action.category === 'upcoming' ? [action.items] : [...state.imdbInformation.upcomingImdb],
                }
            }

        default:
            return state;
    }
}

