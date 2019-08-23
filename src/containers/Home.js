import React, { useEffect } from "react";
import PosterSlider from "../components/PosterSlider";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as SearchActions from "../actions/SearchActions";
import authToken from "../config";

export default function Home() {
  const dispatch = useDispatch();
  const searchByMovie = `https://api.themoviedb.org/3/search/movie?api_key=${authToken}&language=en-US&query=batman&page=1&include_adult=true`;

  //! Google search for "Minimal Viable Product"
  //! ** Make deadline: 10-15 days?
  //! UI - What are the main components or views that are going to be in the project.
  //!     FLOW: STORE => COMPONENT => ACTION => REDUCER
  //!     1.) Main Home Page:
  //!         A. - MAIN NAV BAR / LOGIN PORTAL
  //!         B. - SPLASH SCREEN / MAIN POSTER - POPULAR MOVIES SCROLL ACROSS EVERY COUPLE OF SECONDS.
  //!         C. - CONTENT / TOP SCROLL * 

  const fetchData = url => {
    return dispatch => {
        dispatch(SearchActions.isLoading(true));
        axios(url)
          .then(res => {
            dispatch(SearchActions.isLoading(false));
            return res;
          })
          .then(res => {
            dispatch(SearchActions.searchSuccess(res.data, res.data.results));
            console.log(res.data);
            return res;
          })
          .then(res => {
            console.log(res.data.results);
            dispatch(SearchActions.isLoading(true));
            dispatch(SearchActions.getPosterUrl(res.data.results));
            return res;
          })
          .then(res => {
            dispatch(SearchActions.isLoading(false));
          })
          .catch(err => {
            dispatch(SearchActions.searchError(true));
            console.error(err);
          });

    //   dispatch(SearchActions.isLoading(true));
    //   dispatch(SearchActions.isLoading(false));
    //   dispatch(SearchActions.searchError(true));
    };
  };

  useEffect(() => {
    dispatch(fetchData(searchByMovie));
  }, [searchByMovie]);

  return (
    <>
      <PosterSlider />
    </>
  );
}
