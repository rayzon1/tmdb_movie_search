import React, { useEffect } from "react";
import PosterSlider from "../components/PosterSlider";
import { useSelector, useDispatch } from "react-redux";
import MovieContent from "../components/MovieContent";
import * as PosterClickActions from "../actions/PosterClickActions";

// const omdb = `http://www.omdbapi.com/?apikey=${apiKey}&i=tt2837574`;

const videos = 'https://www.youtube.com/watch?v=' // + KEY

// Need to use movieIds to find video key to add to youtube url above.
const getVideoKeys = 'https://api.themoviedb.org/3/movie/423204/videos?api_key=6d1e723cd6edce1af3e8bf19b4ce51db&language=en-US';

export default function Home() {

  // Main Movie data. State for each category.
  const topRatedData = useSelector(state => state.search.data.topRated["0"]);
  const popularData = useSelector(state => state.search.data.popular["0"]);

  // Movie detail data. State for each category.
  const topRatedDetails = useSelector(state => state.movie.details.topRatedDetails["0"]);
  const popularDetails = useSelector(state => state.movie.details.popularDetails["0"]);

  // imdbInformation. State for each category.
  const topRatedImdbInformation = useSelector(state => state.movie.imdbInformation.topRatedImdb["0"]);
  const popularImdbInformation = useSelector(state => state.movie.imdbInformation.popularImdb["0"]);

  // posterClickState. State for poster clicks, to see which to show or hide.
  const clickPosterState = useSelector(state => state.posterClickState.clickState)
 
  // useDispatch hook to dispatch actions to Redux.
  const dispatch = useDispatch();

  /**
   * Pass in index of clicked state as well as the category string.
   * @param {number} index
   * @param {string} item
   */
  const dispatchClickState = (i, item) => {
    dispatch(PosterClickActions.changeClickState(i, item));
  }

  // Side-effect listening for topRated click.
  useEffect(() => {
    if(clickPosterState.topRated.clicked){
       dispatch(PosterClickActions.setClickedFalse('popular'));
    } 
  }, [clickPosterState.topRated.clicked])

  // Side-effect listening for popular click.
  useEffect(() => {
    if(clickPosterState.popular.clicked){
       dispatch(PosterClickActions.setClickedFalse('topRated'));
    } 
  }, [clickPosterState.popular.clicked])

  /**
   * Component creator will generate posterSlider component depending on params.
   * @param {string} title - Title of specific slider.
   * @param {Object} data - Data object retrieved from state.
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
      {createPosterSliderComponent('Top Rated', topRatedData, dispatchClickState, 'topRated')}
      {createMovieContentComponent(topRatedData, clickPosterState.topRated, topRatedDetails, topRatedImdbInformation)}

      {createPosterSliderComponent('Popular', popularData, dispatchClickState, 'popular')}
      {createMovieContentComponent(popularData, clickPosterState.popular, popularDetails, popularImdbInformation)}
    </>
  );
}
