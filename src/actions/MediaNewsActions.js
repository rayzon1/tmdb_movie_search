import * as MediaNewsActionTypes from '../actiontypes/MediaNewsActionTypes';

export const getMediaNews = data => {
    return {
        type: MediaNewsActionTypes.GET_MEDIA_NEWS,
        payload: data
    }
}