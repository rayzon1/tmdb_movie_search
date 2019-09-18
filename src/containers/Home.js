import React, { useEffect, useCallback } from "react";
import PosterSlider from "../components/PosterSlider";
import { useSelector, useDispatch } from "react-redux";
import MovieContent from "../components/MovieContent";
import { changeClickState, setClickedFalse } from "../actions/PosterClickActions";

// const omdb = `http://www.omdbapi.com/?apikey=${apiKey}&i=tt2837574`;

const videos = 'https://www.youtube.com/watch?v=' // + KEY

// Need to use movieIds to find video key to add to youtube url above.
const getVideoKeys = 'https://api.themoviedb.org/3/movie/423204/videos?api_key=6d1e723cd6edce1af3e8bf19b4ce51db&language=en-US';




export default function Home() {

  // Main Movie data. State for each category.
  const data = useSelector(state => state.search.data);
  const details = useSelector(state => state.movie.details);

  // imdbInformation. State for each category.
  const imdbInformation = useSelector(state => state.movie.imdbInformation);

  // posterClickState. State for poster clicks, to see which to show or hide.
  const clickPosterState = useSelector(state => state.posterClickState.clickState)
 
  // useDispatch hook to dispatch actions to Redux.
  const dispatch = useDispatch();

  /**
   * Pass in index of clicked state as well as the category string.
   * @param {number} index
   * @param {string} item
   */
  const dispatchClickState = useCallback((i, item) => {
    return dispatch(changeClickState(i, item));
  }, [dispatch])

  const setClickFalse = useCallback(arr => {
    return arr.map(cat => {
      return dispatch(setClickedFalse(cat));
    })
  }, [dispatch])

  const category = {
    topRate: ['popular', 'upcoming', 'nowPlaying'],
    popular: ['upcoming', 'topRated', 'nowPlaying'],
    upcoming: ['popular', 'topRated', 'nowPlaying'],
    nowPlaying: ['topRated', 'popular', 'upcoming']
  }
  
  // Side-effect topRated click.
  useEffect(() => {
    if (clickPosterState.topRated.clicked) {
      setClickFalse(category.topRate);
    }
  }, [clickPosterState.topRated.clicked])

  useEffect(() => {
    if (clickPosterState.popular.clicked) {
      setClickFalse(category.popular)
    } 
  }, [clickPosterState.popular.clicked])

  useEffect(() => {
    if(clickPosterState.upcoming.clicked) {
      setClickFalse(category.upcoming)
    } 
  }, [clickPosterState.upcoming.clicked])

  useEffect(() => {
    if(clickPosterState.nowPlaying.clicked) {
      setClickFalse(category.nowPlaying)
    } 
  }, [clickPosterState.nowPlaying.clicked])


  /**
   * Component creator will generate posterSlider component depending on params.
   * @param {string} title - Title of specific slider.
   * @param {obj} data - Data object retrieved from state.
   * @param {function} getPosterStatus - Function with dispatch.
   * @param {string} category - Category string.
   */
  const createPosterSliderComponent = (title, data, getPosterStatus, category) => {
    return (
      <>
        <div style={{ color: "white", textAlign: "left", fontSize: "24px" }}>
            {title}
        </div>
        <PosterSlider
          data={data}
          getPosterStatus={getPosterStatus}
          category={category}
        />
      </>
    )
  }

  const createMovieContentComponent = (data, posterStatus, details, imdbInformation) => {
    return (
      <MovieContent 
          data={data} 
          posterStatus={posterStatus}
          details={details}
          imdbInformation={imdbInformation}
        />
    )
  }


  //Show visibility state (true/false) depending on poster click. Click will show or hide movie content.

  return (
    <>
      {createPosterSliderComponent('Top Rated', data.topRated["0"], dispatchClickState, 'topRated')}
      {createMovieContentComponent(data.topRated["0"], clickPosterState.topRated, details.topRatedDetails["0"], imdbInformation.topRatedImdb["0"] )}

      {createPosterSliderComponent('Popular', data.popular["0"], dispatchClickState, 'popular')}
      {createMovieContentComponent(data.popular["0"], clickPosterState.popular, details.popularDetails["0"], imdbInformation.popularImdb["0"])}

      {createPosterSliderComponent('Upcoming', data.upcoming["0"], dispatchClickState, 'upcoming')}
      {createMovieContentComponent(data.upcoming["0"], clickPosterState.upcoming, details.upcomingDetails["0"], imdbInformation.upcomingImdb["0"])}

      {createPosterSliderComponent('Now Playing', data.nowPlaying["0"], dispatchClickState, 'nowPlaying')}
      {createMovieContentComponent(data.nowPlaying["0"], clickPosterState.nowPlaying, details.nowPlayingDetails["0"], imdbInformation.nowPlayingImdb["0"])}
    </>
  );
}
