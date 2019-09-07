import * as PosterClickActionTypes from "../actiontypes/PosterClickActionTypes";

// actions for poster click, function for each type: popular, top rated, etc.
// actions will update the specific state for index and click.
// parameter = index

export const topRatedClick = index => {
    return {
        type: PosterClickActionTypes.TOP_RATED_CLICK,
        index
    }
}

export const popularClick = index => {
    return {
        type: PosterClickActionTypes.POPULAR_CLICK,
        index
    }
}