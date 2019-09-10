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
};

const returnClick = (action, indexState, clickedState) => {
  return {
    index: action,
    clicked: action === indexState ? !clickedState : true
  };
};

export default function PosterClickReducer(state = initialState, action) {
  switch (action.type) {
    case PosterClickActionTypes.CHANGE_CLICK_STATE:
      return {
        clickState: {
          topRated:
            action.item === "topRated"
              ? returnClick(
                  action.index,
                  state.clickState.topRated.index,
                  state.clickState.topRated.clicked,
                  state.clickState.topRated
                )
              : { ...state.clickState.topRated },
          popular:
            action.item === "popular"
              ? returnClick(
                  action.index,
                  state.clickState.popular.index,
                  state.clickState.popular.clicked,
                  state.clickState.popular
                )
              : { ...state.clickState.popular }
        }
      };

    //CHANGE_FALSE_CLICK_STATE
    case PosterClickActionTypes.CHANGE_FALSE_CLICK_STATE:
      return {
        clickState: {
          topRated: {
            ...state.clickState.topRated,
            clicked: action.item === "topRated" ? false : true
          },
          popular: {
            ...state.clickState.popular,
            clicked: action.item === "popular" ? false : true
          }
        }
      };

    default:
      return state;
  }
}
