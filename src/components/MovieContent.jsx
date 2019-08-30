import React from "react";
import styles from "../modules/component-modules/moviecontent-comp.module.css";
import PropTypes from "prop-types";
// import Slide from "react-reveal/Slide";

export default function MovieContent({
  movieData,
  posterContentStatus,
  movieDetails
}) {
  const posterIndex = posterContentStatus.index;

  return (
    <div className={styles.content}>
      <div className={styles.background}>
        <div className={styles.left}>
          <div className={styles.summary}>
            <div>{movieData && movieData.results[posterIndex].overview}</div>
            <br/>
            <div className={styles.productionLogoContainer}>
              {
                movieDetails.length > 1 && 
                movieDetails[posterIndex].production_companies.map(data => (
                    data.logo_path !== null &&
                    <img src={`https://image.tmdb.org/t/p/w500${data.logo_path}`} className={styles.productionLogo} />
                ))
              }
            </div>
          </div>
        </div>
        <div className={styles.right} />
      </div>
      {movieData && (
        <div className={styles.contentContainer}>
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
  movieData: PropTypes.array.isRequired,
  posterContentStatus: PropTypes.object.isRequired,
  movieDetails: PropTypes.array.isRequired
}
