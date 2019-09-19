import React from "react";
import styles from "../modules/component-modules/posterslider-comp.module.css";
import PropTypes from "prop-types";
import SimpleModal from "./Modal";

export default function PosterSlider({
  data,
  getPosterStatus,
  category,
  trailerLinks
}) {
  //! Map urls and combine to path to gather poster backdrops.
  //! https://image.tmdb.org/t/p/w500

  const [open, setOpen] = React.useState(false);
  const [videoKey, getVideoKey] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const getKeys = (i) => {
    const filteredReviews = trailerLinks.nowPlaying.filter((val, index) => index === i)[0].results.filter(data => data.size === 1080);
    const rand = Math.ceil(Math.random() * filteredReviews.length)
    // console.log(trailerLinks.nowPlaying.filter((val, index) => index === i)[0].results.filter(data => data.size === 1080)[0].key);
    // console.log(rand);
    getVideoKey(filteredReviews[rand].key);
    videoKey && console.log(videoKey);
  }

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
          onClick={() => {
             getPosterStatus(index, category);
            }}
        >
          <div className={styles.tile__media}>
            <img
              className={styles.tile__image}
              src={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`}
              alt="tiles"
            />
          </div>
          <div className={styles.tile__details} >
            <div className={styles.play__click} onClick={() => {
              handleOpen()
              getKeys(index)
              }} />
            <div className={styles.tile__title} >{data.original_title}</div>
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
        <SimpleModal open={open} setOpen={setOpen} />
      </div>
    </>
  );
}

PosterSlider.propTypes = {
  data: PropTypes.array.isRequired,
  getPosterStatus: PropTypes.func.isRequired
};
