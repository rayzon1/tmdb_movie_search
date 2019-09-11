import axios from "axios";
import {
  isLoading,
  searchError,
  getMovieIds,
  getCategoryData
} from "./SearchActions";
import {
  getPosterUrl,
  getMovieDetails,
  getImdbIds,
  getImdbInformation
} from "./MovieActions";

const categories = ["topRated", "popular", "upcoming"];

const manageResults = (items, category, func, action) => {
  let temp = items.map(res => res.data);
  return func(action(temp, category));
};

const asyncThen = (url, dis1, dis2, category, func, action, action2) => {
  return url.then(data => {
    dis1 && manageResults(data, category, func, action);
    dis2 && manageResults(data, category, func, action2 || action);
  }).catch(err => {
    func(searchError(true));
    console.error(
      "There was an eror",
      err.code
    );
  });
};

const setAsyncThen = (
  url,
  bool1,
  bool2,
  category,
  func,
  cat1 = null,
  cat2 = null
) => {
  return url.map((data, index) => {
    return asyncThen(
      axios.all(data),
      bool1,
      bool2,
      category[index],
      func,
      cat1,
      cat2
    );
  });
};

/**
 * THUNK ACTION                                                                                                                                                    N TO RETREIVE ALL IMDB ID MOVIE DETAILS.
 */
export const fetchImdbInformation = (url1, url2, url3) => {
  return dispatch => {
    asyncThen(
      axios.all(url1),
      true,
      false,
      "topRated",
      dispatch,
      getImdbInformation
    );
    asyncThen(
      axios.all(url2),
      true,
      false,
      "popular",
      dispatch,
      getImdbInformation
    );
    asyncThen(
      axios.all(url3),
      true,
      false,
      "upcoming",
      dispatch,
      getImdbInformation
    ).catch(err => {
      dispatch(searchError(true));
      console.error("There was an error fetching imdb information", err.code);
    });
  };
};

/**
 * THUNK ACTION TO GET MOVIE_DETAILS AND IMDB_IDS FROM THE API.
 */
// export const fetchMovieDetails = (url1, url2, url3) => {
//   return dispatch => {
//       asyncThen(axios.all(url1), true, true, 'topRated', dispatch, getMovieDetails, getImdbIds)
//       asyncThen(axios.all(url2), true, true, 'popular', dispatch, getMovieDetails, getImdbIds)
//       asyncThen(axios.all(url3), true, true, 'upcoming', dispatch, getMovieDetails, getImdbIds)
//       .catch(err => {
//         dispatch(searchError(true));
//         console.error("There was an error fetching movie details and ids", err.code);
//       });
//   };
// };



export const fetchMovieDetails = urlArray => {
  return dispatch => {
    // asyncThen(
    //   axios.all(url1),
    //   true,
    //   true,
    //   "topRated",
    //   dispatch,
    //   getMovieDetails,
    //   getImdbIds
    // );
    // asyncThen(
    //   axios.all(url2),
    //   true,
    //   true,
    //   "popular",
    //   dispatch,
    //   getMovieDetails,
    //   getImdbIds
    // );
    // asyncThen(
    //   axios.all(url3),
    //   true,
    //   true,
    //   "upcoming",
    //   dispatch,
    //   getMovieDetails,
    //   getImdbIds
    // )
    setAsyncThen(
      urlArray,
      true,
      true,
      categories,
      dispatch,
      getMovieDetails,
      getImdbIds
    );
  };
};

/**
 * THUNK ACTION TO FRONTLOAD SEARCH DATA AS WELL AS POSTER URLS.
 *
 * axios.all => axios.spread into redux store for each category, popular/toprated etc.
 */
export const fetchData = url => {
  return dispatch => {
    dispatch(isLoading(true));
    axios
      .all(url)
      .then(
        axios.spread((top, pop, up) => {
          dispatch(getCategoryData(top.data, pop.data, up.data));
          dispatch(
            getMovieIds(top.data.results, pop.data.results, up.data.results)
          );
          dispatch(
            getPosterUrl(top.data.results, pop.data.results, up.data.results)
          );
          dispatch(isLoading(false));
        })
      )
      .catch(err => {
        dispatch(searchError(true));
        console.error(err);
      });
  };
};
