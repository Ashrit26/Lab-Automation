import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SignOutButton from './SignOut';
import { Link } from 'react-router-dom';


const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function NavigationNonAuth(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>

          <Typography variant="title" color="white" className={classes.flex}>
            <Link to='/'>Home</Link>
          </Typography>
          <Button color="black"><Link to='/signin'>Sign In</Link></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavigationNonAuth.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationNonAuth);
