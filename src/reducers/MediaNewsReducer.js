import * as MediaNewsActionTypes from '../actiontypes/MediaNewsActionTypes';

const initialState = {
    mediaNews: []
}

export default function MediaNewsReducer(state=initialState, action) {
    switch (action.type) {
        case MediaNewsActionTypes.GET_MEDIA_NEWS:
            return {
                mediaNews: action.payload.data
            }
    
        default:
            return state;
    }
}