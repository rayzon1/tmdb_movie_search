import React from "react";
import styles from "../modules/component-modules/posterslider-comp.module.css";

export default function PosterSlider({ path }) {
  //! Map urls and combine to path to gather poster backdrops.
  //! https://image.tmdb.org/t/p/w500

//   const backdropPath = `https://image.tmdb.org/t/p/w500${path}`;

  return (
    <div className={styles.contain}>
      <div className={styles.row}>
        <div className={styles.row__inner}>
            {
                path &&
                path.map(data => (
                    <div className={styles.tile}>
                        <div className={styles.tile__media}>
                            <img className={styles.tile__image} src={`https://image.tmdb.org/t/p/w300${data}`} />
                        </div>
                        <div className={styles.tile__details}>
                            <div className={styles.tile__title}>Top Gear</div>
                        </div>
                    </div>
                    ))
            }
        </div>
      </div>
    </div>
  );
}
