import React, { useEffect, useState } from "react";
import PosterSlider from "../components/PosterSlider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import MovieContent from "../components/MovieContent";
import { authToken, apiKey } from "../config";
import { fetchMovieDetails } from "../actions/ThunkActions";

const omdb = `http://www.omdbapi.com/?apikey=${apiKey}&i=tt2837574`;

export default function Home() {
  const dispatch = useDispatch();
  const path = useSelector(state => state.movie.url);
  const movieIds = useSelector(state => state.search.movieIds);
  const movieData = useSelector(state => state.search.data["0"]);
  const [posterContentStatus, getPosterContentStatus] = useState({
    clicked: false,
    index: 0
  });

  // const movieDetails = movieIds.map(data => {
  //   return axios.get(`https://api.themoviedb.org/3/movie/${data}?api_key=${authToken}&language=en-US`);
  // })

  //! Google search for "Minimal Viable Product"
  //! ** Make deadline: 10-15 days?
  //! UI - What are the main components or views that are going to be in the project.
  //!     FLOW: STORE => COMPONENT => ACTION => REDUCER
  //!     1.) Main Home Page:
  //!         A. - MAIN NAV BAR / LOGIN PORTAL
  //!         B. - SPLASH SCREEN / MAIN POSTER - POPULAR MOVIES SCROLL ACROSS EVERY COUPLE OF SECONDS.
  //!             * CONTENT / TOP SCROLL * NETFLIX MOVIE RIGHT BELOW NAVBAR.

  useEffect(() => {
    dispatch(fetchMovieDetails(
      movieIds.map(data => {
        return axios.get(`https://api.themoviedb.org/3/movie/${data}?api_key=${authToken}&language=en-US`);
      })
    ));
  }, [dispatch, movieIds])


  return (
    <>
      <PosterSlider
        movieData={path.length > 2 && movieData}
        getPosterContentStatus={getPosterContentStatus}
      />
      <MovieContent 
        movieData={path.length > 2 && movieData} 
        getPosterContentStatus={getPosterContentStatus}
        posterContentStatus={posterContentStatus}
        movieIds={movieIds.length > 2 && movieIds}
      />
    </>
  );
}
