import React from "react";
import styles from "../modules/component-modules/posterslider-comp.module.css";

export default function PosterSlider({ movieData }) {
  //! Map urls and combine to path to gather poster backdrops.
  //! https://image.tmdb.org/t/p/w500
  
  console.log(movieData.results)
//   const backdropPath = `https://image.tmdb.org/t/p/w500${path}`;

  return (
    <div className={styles.contain}>
      <div className={styles.row}>
        <div className={styles.row__inner}>
            {
                movieData &&
                movieData.results.map(data => (
                    <div className={styles.tile}>
                        <div className={styles.tile__media}>
                            <img className={styles.tile__image} src={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`} />
                        </div>
                        <div className={styles.tile__details}>
                          <div className={styles.tile__title}>{data.original_title}</div>
                        </div>
                    </div>
                    ))
            }
        </div>
      </div>
    </div>
  );
}
