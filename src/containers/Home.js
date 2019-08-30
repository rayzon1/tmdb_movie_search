import React, { useState } from "react";
import PosterSlider from "../components/PosterSlider";
import { useSelector } from "react-redux";
import MovieContent from "../components/MovieContent";
import { apiKey } from "../config";

const omdb = `http://www.omdbapi.com/?apikey=${apiKey}&i=tt2837574`;

export default function Home() {
  const path = useSelector(state => state.movie.url);
  const movieData = useSelector(state => state.search.data["0"]);
  const movieDetails = useSelector(state => state.movie.movieDetails["0"]);
  const [posterContentStatus, getPosterContentStatus] = useState({
    clicked: false,
    index: 0
  });

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
      <PosterSlider
        movieData={path.length > 2 && movieData}
        getPosterContentStatus={getPosterContentStatus}
      />
      <MovieContent 
        movieData={path.length > 2 && movieData} 
        posterContentStatus={posterContentStatus}
        movieDetails={movieDetails !== undefined && movieDetails}
      />
    </>
  );
}
