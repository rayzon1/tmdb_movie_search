import SearchReducer from "./SearchReducer";
import movieReducer from "./movieReducers";
import VideoTrailerReducer from "./VideoTrailerReducer";
import PosterClickReducer from "./PosterClickReducer";
import MediaNewsReducer from "./MediaNewsReducer";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// put store here and combine reducers then export

const rootReducer = combineReducers({
  search: SearchReducer,
  movie: movieReducer,
  posterClickState: PosterClickReducer,
  videoTrailers: VideoTrailerReducer,
  mediaNews: MediaNewsReducer,
});

const searchStore = () => {
  return createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      composeWithDevTools()
    )
  );
};

const store = searchStore();
export default store;
