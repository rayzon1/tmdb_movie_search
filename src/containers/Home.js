import React, { useEffect } from "react";
import PosterSlider from "../components/PosterSlider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as SearchActions from "../actions/SearchActions";
import * as MovieActions from "../actions/MovieActions";
import authToken from "../config";

export default function Home() {
  const dispatch = useDispatch();
  const searchByMovie = `https://api.themoviedb.org/3/search/movie?api_key=${authToken}&language=en-US&query=batman&page=1&include_adult=true`;
  const path = useSelector(state => state.movie.url)


  //! Google search for "Minimal Viable Product"
  //! ** Make deadline: 10-15 days?
  //! UI - What are the main components or views that are going to be in the project.
  //!     FLOW: STORE => COMPONENT => ACTION => REDUCER
  //!     1.) Main Home Page:
  //!         A. - MAIN NAV BAR / LOGIN PORTAL
  //!         B. - SPLASH SCREEN / MAIN POSTER - POPULAR MOVIES SCROLL ACROSS EVERY COUPLE OF SECONDS.
  //!             * CONTENT / TOP SCROLL * NETFLIX MOVIE RIGHT BELOW NAVBAR.


  
  const fetchData = url => {
    return dispatch => {
        dispatch(SearchActions.isLoading(true));
        axios(url)
          .then(res => {
            dispatch(SearchActions.searchSuccess(res.data, res.data.results));
            dispatch(MovieActions.getPosterUrl(res.data.results));
            dispatch(SearchActions.isLoading(false));
          })
          .catch(err => {
            dispatch(SearchActions.searchError(true));
            console.error(err);
          });
    };
  };

  useEffect(() => {
    dispatch(fetchData(searchByMovie));
  }, [searchByMovie]);

  return (
    <>
      <PosterSlider path={path.length > 2 && path }/>
    </>
  );
}
