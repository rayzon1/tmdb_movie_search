import React from "react";
import styles from "../modules/component-modules/moviecontent-comp.module.css";
import imdb_logo from "../images/icons/imdb_logo.png";
import metacritic from "../images/icons/metacritic.png";
import rt from "../images/icons/rt.png";

export default function MovieContent({
  data,
  posterStatus,
  details,
  imdbInformation,
}) {

  // Poster index from Redux state
  const posterIndex = posterStatus.index;

  // Logo icons.
  const reviewLogos = {
    imdb_logo,
    metacritic,
    rt
  };

  const createReview = () => {
    return (
      imdbInformation &&
      imdbInformation[posterIndex].Ratings.map(data => {
        if (data.Source.includes("Internet")) {
          return (
            <span className={styles.reviewLogoContainer}>
              <img
                src={reviewLogos.imdb_logo}
                style={{ width: "3%", borderRadius: "25px" }}
                alt="imdb-logo"
              />{" "}
              {data.Value}
            </span>
          );
        }
        if (data.Source.includes("Rotten")) {
          return (
            <span className={styles.reviewLogoContainer}>
              <img src={reviewLogos.rt} style={{ width: "3%" }} alt="rt-logo" />{" "}
              {data.Value}
            </span>
          );
        }
        if (data.Source.includes("Metacritic")) {
          return (
            <span className={styles.reviewLogoContainer}>
              <img
                src={reviewLogos.metacritic}
                style={{ width: "3%" }}
                alt="meta-logo"
              />{" "}
              {data.Value}
            </span>
          );
        }
        return data;
      })
    );
  };

  return (
      <div className={posterStatus.clicked ? styles.content : styles.hideContent}>
        <div className={styles.summary}>
          <div className={styles.contentContainer}>
            {data && data.results[posterIndex].overview}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {createReview()}
          </div>
          <div className={styles.productionLogoContainer}>
            {details &&
              details[posterIndex].production_companies.map(
                data =>
                  data.logo_path !== null && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${data.logo_path}`}
                      className={styles.productionLogo}
                      alt="production-logo"
                    />
                  )
              )}
          </div>
        </div>

        {data && (
          <div className={styles.posterContainer}>
            <img
              src={`https://image.tmdb.org/t/p/w500${
                data.results[posterIndex].poster_path
              }`}
              className={styles.posterImage}
              alt="poster-images"
            />
          </div>
        )}
      </div>
  );
}

