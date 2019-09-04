import React, { useState } from "react";
import styles from "../modules/component-modules/moviecontent-comp.module.css";
import PropTypes from "prop-types";
import imdb_logo from "../images/icons/imdb_logo.png";
import metacritic from "../images/icons/metacritic.png";
import rt from "../images/icons/rt.png";
// import Slide from "react-reveal/Slide";

export default function MovieContent({
  movieData,
  posterContentStatus,
  movieDetails,
  imdbIds
}) {

  const posterIndex = posterContentStatus.index;
  const reviewLogos= [
    imdb_logo,
    metacritic,
    rt
  ];

  return (
    <div className={styles.content}>
      <div className={styles.summary}>
        <div className={styles.contentContainer}>{movieData && movieData.results[posterIndex].overview}</div>
        
        <img src={reviewLogos[0]} style={{width: "5%", borderRadius: "25px"}}/>
        <img src={reviewLogos[1]} style={{width: "5%"}}/>
        <img src={reviewLogos[2]} style={{width: "5%"}}/>

        <div className={styles.productionLogoContainer}>
          {
            movieDetails && 
            movieDetails[posterIndex].production_companies.map(data => (
                data.logo_path !== null &&
                <img src={`https://image.tmdb.org/t/p/w500${data.logo_path}`} className={styles.productionLogo} />
            ))
          }
        </div>
      </div>
      {movieData && (
        <div className={styles.posterContainer}>
          <img
            src={`https://image.tmdb.org/t/p/w500${
              movieData.results[posterIndex].poster_path
            }`}
            className={styles.posterImage}
            alt="poster-images"
          />
        </div>
      )}
    </div>
  );
}

MovieContent.propTypes = {
  movieData: PropTypes.object.isRequired,
  posterContentStatus: PropTypes.object.isRequired,
  movieDetails: PropTypes.object.isRequired
}
