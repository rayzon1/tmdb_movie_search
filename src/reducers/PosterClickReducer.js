import * as PosterClickActionTypes from "../actiontypes/PosterClickActionTypes";

const initialState = {

    clickState: {
        topRated: {
            index: 0,
            clicked: false
        },
        popular: {
            index: 0,
            clicked: false
        }
    }
}

export default function PosterClickReducer(state=initialState, action) {

    switch (action.type) {
        case PosterClickActionTypes.TOP_RATED_CLICK:
            return {
                clickState: {
                    topRated: {
                        index: action.index,
                        clicked: action.index === state.clickState.topRated.index ? !state.clickState.topRated.clicked : true
                    },
                    popular: {...state.clickState.popular}
                }
            }

        case PosterClickActionTypes.POPULAR_CLICK:
            return {
                clickState: {
                    topRated: {...state.clickState.topRated},
                    popular: {
                        index: action.index,
                        clicked: action.index === state.clickState.popular.index ? !state.clickState.popular.clicked : true
                    }
                }
            }
            
    
        default:
            return state
    }



}