import { authToken, apiKey } from "../config";
import axios from 'axios';

/**
 * Creates movie categories to put in thunk dispatch.
 */

export const movieUrls = data => {
    return `https://api.themoviedb.org/3/movie/${data}?api_key=${authToken}&language=en-US`;
  }

export const imdbUrls = data => {
    return `http://www.omdbapi.com/?apikey=${apiKey}&i=${data}`
}

export const categories = [
    'top_rated',
    'popular',
    'upcoming',
    'now_playing'
]

export const createUrls = (items, func) => {
    return items.map(item => {
        return axios.get(func(item));
    })
}

export const sendUrls = (arr, urls) => {
    return arr.map(data => {
      return createUrls(data, urls);
    })
  }

export const movieIdArray = arr =>{
    return [
      arr.topRated,
      arr.popular,
      arr.upcoming,
      arr.nowPlaying
    ]
  } 

export const imdbIdArray = arr => {
    return [
      arr.topRatedIds,
      arr.popularIds,
      arr.upcomingIds,
      arr.nowPlayingIds
    ]
  }