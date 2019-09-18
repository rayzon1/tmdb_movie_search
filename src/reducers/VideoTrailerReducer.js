import * as VideoTrailerActionTypes from '../actiontypes/VideoTrailerActionTypes';

const initialState = {

    videoKeys: {
        topRated: [],
        popular: [],
        upcoming: [],
        nowPlaying: [],
    }
};


export default function VideoTrailerReducer(state=initialState, action) {
    switch (action.type) {
        case VideoTrailerActionTypes.GET_VIDEO_KEYS:
            return {
                videoKeys: {
                    topRated: [action.payload],
                    
                }
            }
    
        default:
            return state;
    }
}