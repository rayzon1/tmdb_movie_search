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
    },
    upcoming: {
      index: 0,
      clicked: false
    },
    nowPlaying: {
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
              : { ...state.clickState.popular },
          upcoming:
            action.item === "upcoming"
              ? returnClick(
                  action.index,
                  state.clickState.upcoming.index,
                  state.clickState.upcoming.clicked,
                  state.clickState.upcoming
                )
              : { ...state.clickState.upcoming },
          nowPlaying:
            action.item === "nowPlaying"
              ? returnClick(
                  action.index,
                  state.clickState.nowPlaying.index,
                  state.clickState.nowPlaying.clicked,
                  state.clickState.nowPlaying
                )
              : { ...state.clickState.nowPlaying },
        }
      };

    //CHANGE_FALSE_CLICK_STATE
    case PosterClickActionTypes.CHANGE_FALSE_CLICK_STATE:
      return {
        clickState: {
          topRated: {
            ...state.clickState.topRated,
            clicked: action.item === "topRated" ? false : state.clickState.topRated.clicked
          },
          popular: {
            ...state.clickState.popular,
            clicked: action.item === "popular" ? false : state.clickState.popular.clicked
          },
          upcoming: {
            ...state.clickState.upcoming,
            clicked: action.item === "upcoming" ? false : state.clickState.upcoming.clicked
          },
          nowPlaying: {
            ...state.clickState.nowPlaying,
            clicked: action.item === "nowPlaying" ? false : state.clickState.nowPlaying.clicked
          }
        }
      };

    default:
      return state;
  }
}
