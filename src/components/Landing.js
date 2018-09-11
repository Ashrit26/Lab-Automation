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

const styles1 = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});


function ContainedButtons(props) {
  const { classes } = props;
  return (
    <div>
<Button variant="contained" color="secondary" className={classes.button}>
<Link to='/signin'>Sign In</Link>
      </Button>
      <div style={{textAlign: "center"}}>
<h1 style={{color: "#ff3d00"}}>Lab Automation</h1>
</div>
      
      </div>
  );
}

ContainedButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(ContainedButtons);






