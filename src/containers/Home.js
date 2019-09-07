import React, { useState } from "react";
import PosterSlider from "../components/PosterSlider";
import { useSelector, useDispatch } from "react-redux";
import MovieContent from "../components/MovieContent";
import * as PosterClickActions from "../actions/PosterClickActions";

// const omdb = `http://www.omdbapi.com/?apikey=${apiKey}&i=tt2837574`;

const videos = 'https://www.youtube.com/watch?v=' // + KEY

// Need to use movieIds to find video key to add to
const getVideoKeys = 'https://api.themoviedb.org/3/movie/423204/videos?api_key=6d1e723cd6edce1af3e8bf19b4ce51db&language=en-US';

export default function Home() {
  const topRatedData = useSelector(state => state.search.data.topRated["0"]);
  const popularData = useSelector(state => state.search.data.popular["0"]);

  const topRatedDetails = useSelector(state => state.movie.details.topRatedDetails["0"]);
  const popularDetails = useSelector(state => state.movie.details.popularDetails["0"]);

  const topRatedImdbInformation = useSelector(state => state.movie.imdbInformation.topRatedImdb["0"]);
  const popularImdbInformation = useSelector(state => state.movie.imdbInformation.popularImdb["0"]);

  const clickPosterState = useSelector(state => state.posterClickState.clickState)
 
  const dispatch = useDispatch();

  const dispatchTopRated = i => {
    return dispatch(PosterClickActions.topRatedClick(i));
  }

  const dispatchPopular = i => {
    return dispatch(PosterClickActions.popularClick(i));
  }

  //Show visibility state (true/false) depending on poster click. Click will show or hide movie content.

  //! Google search for "Minimal Viable Product"
  //! ** Make deadline: 10-15 days?
  //! UI - What are the main components or views that are going to be in the project.
  //!     FLOW: STORE => COMPONENT => ACTION => REDUCER
  //!     1.) Main Home Page:
  //!         A. - MAIN NAV BAR / LOGIN PORTAL
  //!         B. - SPLASH SCREEN / MAIN POSTER - POPULAR MOVIES SCROLL ACROSS EVERY COUPLE OF SECONDS.
  //!             * CONTENT / TOP SCROLL * NETFLIX MOVIE RIGHT BELOW NAVBAR.

  return (
    <>
      <div style={{ color: "white", textAlign: "left", fontSize: "24px" }}>
          Top Rated
      </div>
      <PosterSlider
        data={topRatedData}
        getPosterStatus={dispatchTopRated}
      />
      <MovieContent 
        data={topRatedData} 
        posterStatus={clickPosterState.topRated}
        details={topRatedDetails}
        imdbInformation={topRatedImdbInformation}
      />
      <div style={{ color: "white", textAlign: "left", fontSize: "24px" }}>
          Popular
      </div>
      <PosterSlider
        data={popularData}
        getPosterStatus={dispatchPopular}
      />
      <MovieContent 
        data={popularData} 
        posterStatus={clickPosterState.popular}
        details={popularDetails}
        imdbInformation={popularImdbInformation}
      />
    </>
  );
}
