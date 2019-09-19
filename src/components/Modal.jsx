import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    return{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        outline: 'none'
    }
}

const useStyles = makeStyles(theme => ({
  paper: {
    width: "80%",
    height: '60%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: 0
  },
}));

export default function SimpleModal({ open, setOpen }) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        style={modalStyle}
      >
        <div className={classes.paper}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/K_tLp7T6U1c?controls=0&autoplay=1&loop=1" frameborder="0" allow="accelerometer; autoplay=1; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <SimpleModal />
        </div>
      </Modal>
    </div>
  );
}