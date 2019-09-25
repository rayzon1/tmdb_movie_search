import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
import MovieIcon from '@material-ui/icons/Movie';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles({
  list: {
    width: 350,
    backgroundColor: '#242424',
    height: '100%',
    color: 'white'
    
  },
  fullList: {
    width: 'auto',
  },
});

function TemporaryDrawer({ state, setState, toggleDrawer, history }) {
  const classes = useStyles();

  const sideLinks = category => {
    if (category === 'Home') {
      history.replace('/home');
    }
  }

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Home', 'Movies', 'TV Shows', 'Search'].map((text, index) => (
          <ListItem button key={text} onClick={() => sideLinks(text)}>
            <div style={{height: '15vh'}} />
            <ListItemIcon>{index % 2 === 0 ? <HomeIcon style={{color: 'red'}}/> : <MovieIcon style={{color: 'red'}}/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  return (
    <div>
      
      <Drawer style={{opacity: '0.8'}} open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    
    </div>
  );
}

export default withRouter(TemporaryDrawer);