import React from "react";
import styles from "../modules/component-modules/posterslider-comp.module.css";
import PropTypes from "prop-types";

export default function PosterSlider({
  data,
  getPosterStatus,
}) {
  //! Map urls and combine to path to gather poster backdrops.
  //! https://image.tmdb.org/t/p/w500

  /**
   * Mapped image tiles showing popular movies in scrollbar.
   */
  const imageTiles = () => {
    return (
      data &&
      data.results.map((data, index) => (
        <div
          className={styles.tile}
          key={index}
          onClick={() => getPosterStatus(index)}
        >
          <div className={styles.tile__media}>
            <img
              className={styles.tile__image}
              src={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`}
              alt="tiles"
            />
          </div>
          <div className={styles.tile__details}>
            <div className={styles.tile__title}>{data.original_title}</div>
          </div>
        </div>
      ))
    );
  };

  return (
    <>
      <div className={styles.contain}>
        <div className={styles.row}>
          <div className={styles.row__inner}>{imageTiles()}</div>
        </div>
      </div>
    </>
  );
}

PosterSlider.propTypes = {
  data: PropTypes.array.isRequired,
  getPosterStatus: PropTypes.func.isRequired
};
