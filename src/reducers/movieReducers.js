import * as MovieActionTypes from '../actiontypes/MovieActionTypes';


//! https://image.tmdb.org/t/p/w500


const initialState = {
    url: {
        topRated: [],
        popular: [],
        upcoming: [],
        nowPlaying: []
    },
    details: {
        topRatedDetails: [],
        popularDetails: [],
        upcomingDetails: [],
        nowPlayingDetails: []
    },
    imdbIds: {
        topRatedIds: [],
        popularIds: [],
        upcomingIds: [],
        nowPlayingIds: []
    },
    imdbInformation: {
        topRatedImdb: [],
        popularImdb: [],
        upcomingImdb: [],
        nowPlayingImdb: []
    }
}

const backdropUrls = arr =>{
    return arr.map(res => {
        return res.backdrop_path;
    })
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
                    topRated: backdropUrls(action.items1),
                    popular: backdropUrls(action.items2),
                    upcoming: backdropUrls(action.items3),
                    nowPlaying: backdropUrls(action.items4)
                }
            }
      
        case MovieActionTypes.GET_MOVIE_DETAILS:
            return {
                ...state,
                details: {
                    topRatedDetails: action.category === 'topRated' ? [action.arr] : [...state.details.topRatedDetails],
                    popularDetails: action.category === 'popular' ? [action.arr] : [...state.details.popularDetails],
                    upcomingDetails: action.category === 'upcoming' ? [action.arr] : [...state.details.upcomingDetails],
                    nowPlayingDetails: action.category === 'nowPlaying' ? [action.arr] : [...state.details.nowPlayingDetails]
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
                    nowPlayingIds: action.category === 'nowPlaying' ? action.items.map(res => {
                        return res.imdb_id;
                    }) : [...state.imdbIds.nowPlayingIds],
                }
                
                
            }
        
        case MovieActionTypes.GET_IMDB_INFORMATION:
            return {
                ...state,
                imdbInformation: {
                    topRatedImdb: action.category === 'topRated' ? [action.items] : [...state.imdbInformation.topRatedImdb],
                    popularImdb: action.category === 'popular' ? [action.items] : [...state.imdbInformation.popularImdb],
                    upcomingImdb: action.category === 'upcoming' ? [action.items] : [...state.imdbInformation.upcomingImdb],
                    nowPlayingImdb: action.category === 'nowPlaying' ? [action.items] : [...state.imdbInformation.nowPlayingImdb],
                }
            }

        default:
            return state;
    }
}

