import * as VideoTrailerActionTypes from '../actiontypes/VideoTrailerActionTypes';

/**
 * Define actions to obtain video keys from tmdb url. This will need to use the movie Ids from the store.
 *  https://api.themoviedb.org/3/movie/423204/videos?api_key=6d1e723cd6edce1af3e8bf19b4ce51db&language=en-US *Get youtube Keys
 *  https://www.youtube.com/watch?v= *Create 
 */

 // 1. Create full url endpoint with stored movieIds. Create a function to generate a full url. 
 // 2. Create reducers to hold keys for movie trailers as well as youtube urls for the trailers.
 // 4. Store the results of the endpoint (youtube keys for movie trailers) in an array within the store.
 // 5. User youtube keys to display movie trailer videos 
 
 export const getVideoKeys = data => {
    return {
        type: VideoTrailerActionTypes.GET_VIDEO_KEYS,
        payload: data
    }
 }

 export const getYoutubeLinks = data => {
     return {
         type: VideoTrailerActionTypes.GET_YOUTUBE_LINKS,
         payload: data
     }
 }