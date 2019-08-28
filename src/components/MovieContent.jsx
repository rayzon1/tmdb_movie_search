import React from "react";
import styles from "../modules/component-modules/moviecontent-comp.module.css";

export default function MovieContent({
  movieData,
  posterContentStatus,
  getPosterContentStatus
}) {
  const posterIndex = posterContentStatus.index;

  return (
    <div className={styles.content}>
      <div className={styles.background}>
        <div className={styles.left}><span style={{color: 'white'}}>{movieData && movieData.results[posterIndex].overview}</span></div>
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
