import * as PosterClickActionTypes from "../actiontypes/PosterClickActionTypes";

// actions for poster click, function for each type: popular, top rated, etc.
// actions will update the specific state for index and click.
// parameter = index

export const changeClickState = (index, item) => {
    return {
        type: PosterClickActionTypes.CHANGE_CLICK_STATE,
        index,
        item
    }
}

export const setClickedFalse = item => {
    return {
        type: PosterClickActionTypes.CHANGE_FALSE_CLICK_STATE,
        item
    }
}