import { searchError } from '../actions/SearchActions';
import axios from 'axios';

// Movie categories go here.
export const categories = ["topRated", "popular", "upcoming", "nowPlaying"];

export const manageResults = (items, category, func, action) => {
  let temp = items.map(res => res.data);
  return func(action(temp, category));
};

//Messy function returns async function plus error handler for Thunk actions.
export const asyncThen = (url, dis1, dis2, category, func, action, action2) => {
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

//This will set and wrap asyncThen function.
export const setAsyncThen = (
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