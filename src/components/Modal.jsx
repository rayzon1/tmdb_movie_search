import React from "react";
import Modal from "@material-ui/core/Modal";
import styles from "../modules/component-modules/modal-comp.module.css";

export default function SimpleModal({ open, setOpen, videoKey }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={videoKey && open}
        onClose={handleClose}
        className={styles.modal}
      >
        <div className={styles.paper}>
          {videoKey === "nope" ? (
            <p>Sorry No Content</p>
          ) : (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}?controls=0&autoplay=1&loop=1`}
              frameborder="0"
              allow="accelerometer; autoplay=1; encrypted-media; gyroscope; picture-in-picture"
              title="youtube-trailers"
              allowfullscreen
            ></iframe>
          )}
          <SimpleModal />
        </div>
      </Modal>
    </div>
  );
}
