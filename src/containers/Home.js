import React, { useEffect, useCallback } from "react";
import PosterSlider from "../components/PosterSlider";
import { useSelector, useDispatch } from "react-redux";
import MovieContent from "../components/MovieContent";
import {
  changeClickState,
  setClickedFalse
} from "../actions/PosterClickActions";
import styles from "../modules/container-modules/home-container.module.css";
import CarouselHead from "../components/Carousel";
import SearchBar from "../components/SearchBar";
import SearchResults from '../components/SearchResults';

// const omdb = `http://www.omdbapi.com/?apikey=${apiKey}&i=tt2837574`;

const videos = "https://www.youtube.com/watch?v="; // + KEY

// Need to use movieIds to find video key to add to youtube url above.
const getVideoKeys =
  "https://api.themoviedb.org/3/movie/423204/videos?api_key=6d1e723cd6edce1af3e8bf19b4ce51db&language=en-US";

export default function Home() {
  // Main Movie data. State for each category.
  const data = useSelector(state => state.search.data);
  const details = useSelector(state => state.movie.details);

  // imdbInformation. State for each category.
  const imdbInformation = useSelector(state => state.movie.imdbInformation);

  // posterClickState. State for poster clicks, to see which to show or hide.
  const clickPosterState = useSelector(
    state => state.posterClickState.clickState
  );

  const trailerLinks = useSelector(state => state.videoTrailers.videoKeys);

  const mediaNews = useSelector(state => state.mediaNews.mediaNews);

  // useDispatch hook to dispatch actions to Redux.
  const dispatch = useDispatch();

  
  /**
   * Pass in index of clicked state as well as the category string.
   */
  const dispatchClickState = useCallback(
    (i, item) => {
      return dispatch(changeClickState(i, item));
    },
    [dispatch]
  );

  /**
   * Will map through categories and
   */
  const setClickFalse = useCallback(
    arr => {
      return arr.map(cat => {
        return dispatch(setClickedFalse(cat));
      });
    },
    [dispatch]
  );

  const category = {
    topRated: ["popular", "upcoming", "nowPlaying"],
    popular: ["upcoming", "topRated", "nowPlaying"],
    upcoming: ["popular", "topRated", "nowPlaying"],
    nowPlaying: ["topRated", "popular", "upcoming"]
  };

  const effects = (cat, cat2) => {
    if (cat.clicked) {
      setClickFalse(cat2);
    }
    return () => {
      console.log("unmounted");
    };
  };

  /**
   * Side-effects will determine when one category is selected the rest if open will close.
   */
  useEffect(() => {
    effects(clickPosterState.topRated, category.topRated);
  }, [clickPosterState.topRated.clicked]);

  useEffect(() => {
    effects(clickPosterState.popular, category.popular);
  }, [clickPosterState.popular.clicked]);

  useEffect(() => {
    effects(clickPosterState.upcoming, category.upcoming);
  }, [clickPosterState.upcoming.clicked]);

  useEffect(() => {
    effects(clickPosterState.nowPlaying, category.nowPlaying);
  }, [clickPosterState.nowPlaying.clicked]);

  const [videoKey, getVideoKey] = React.useState(null);

  const getKeys = (i, category) => {
    const Trailers = trailerLinks[category]
      .filter((val, index) => index === i)[0]
      .results.filter(data => data.size === 1080);
    const rand = Math.floor(Math.random() * Trailers.length);
    getVideoKey(Trailers[rand] === undefined ? "nope" : Trailers[rand].key);
  };

  /**
   * Component creator will generate posterSlider component depending on params.
   */
  const createPosterSliderComponent = (
    title,
    data,
    getPosterStatus,
    category
  ) => {
    return (
      <>
        <div
          className={
            title === "Top Rated" ? styles.topRatedTitle : styles.title
          }
        >
          {title}
        </div>
        <PosterSlider
          data={data}
          getPosterStatus={getPosterStatus}
          category={category}
          getKeys={getKeys}
          videoKey={videoKey && videoKey}
        />
      </>
    );
  };

  const createMovieContentComponent = (
    data,
    posterStatus,
    details,
    imdbInformation
  ) => {
    return (
      <MovieContent
        data={data}
        posterStatus={posterStatus}
        details={details}
        imdbInformation={imdbInformation}
      />
    );
  };

  //Show visibility state (true/false) depending on poster click. Click will show or hide movie content.

  return (
    <>
      {/* <div
        style={{
          display: "inline-flex",
          marginLeft: "66px",
          textAlign: "left"
        }}
      >
        <h2 style={{ alignSelf: "center", width: "116px" }}>Search</h2>
        <SearchBar />
        
      </div>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <SearchResults />
      </div> */}
      <CarouselHead mediaNews={mediaNews.totalResults > 1 && mediaNews}/>
      {createPosterSliderComponent(
        "Top Rated",
        data.topRated["0"],
        dispatchClickState,
        "topRated"
      )}
      {createMovieContentComponent(
        data.topRated["0"],
        clickPosterState.topRated,
        details.topRatedDetails["0"],
        imdbInformation.topRatedImdb["0"]
      )}

      {createPosterSliderComponent(
        "Popular",
        data.popular["0"],
        dispatchClickState,
        "popular"
      )}
      {createMovieContentComponent(
        data.popular["0"],
        clickPosterState.popular,
        details.popularDetails["0"],
        imdbInformation.popularImdb["0"]
      )}
      {createPosterSliderComponent(
        "Now Playing",
        data.nowPlaying["0"],
        dispatchClickState,
        "nowPlaying"
      )}
      {createMovieContentComponent(
        data.nowPlaying["0"],
        clickPosterState.nowPlaying,
        details.nowPlayingDetails["0"],
        imdbInformation.nowPlayingImdb["0"]
      )}
      {/* {createPosterSliderComponent(
        "Upcoming",
        data.upcoming["0"],
        dispatchClickState,
        "upcoming"
      )}
      {createMovieContentComponent(
        data.upcoming["0"],
        clickPosterState.upcoming,
        details.upcomingDetails["0"],
        imdbInformation.upcomingImdb["0"]
      )} */}
    </>
  );
}
