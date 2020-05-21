import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Tooltip from '@material-ui/core/Tooltip';

import BlogForm from './BlogForm';
import Search from './Search';
import { searchBlogs } from '../actions/blogActions';
import { logout } from '../actions/authActions';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    height: 80
  },
  navbar: {
    backgroundColor: '#021834',
    borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1)
    }
  },

  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.secondary.light,
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(5),
      height: theme.spacing(5)
    }
  },
  sectionDesktop: {
    display: 'flex',
    marginRight: 15
  },
  link: {
    backgroundColor: 'white'
  },
  color: {
    color: 'white'
  },
  authGrp: {
    margin: theme.spacing(2),
    textDecoration: 'none',
    color: 'white'
  }
}));

const Header = () => {
  const user = useSelector(state => state.authUser.user);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const search = value => {
    dispatch(searchBlogs(value));
    history.push('/search');
  };
  const Logout = () => {
    dispatch(logout());
  };
  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.navbar} elevation={4}>
        <Toolbar>
          <Avatar variant='square' className={classes.avatar}>
            B
          </Avatar>
          <Search search={search} />
          <Hidden smDown>
            <Fragment>
              <div className={classes.grow} />
              {user._id ? (
                <Fragment>
                  <div className={classes.sectionDesktop}>
                    <Link to='/'>
                      <Tooltip title='Home'>
                        <IconButton className={classes.color}>
                          <HomeIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Link to='/followed'>
                      <Tooltip title='Explore followed'>
                        <IconButton className={classes.color}>
                          <ExploreIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                    <Link to='/' onClick={Logout}>
                      <Tooltip title='Logout'>
                        <IconButton className={classes.color}>
                          <ExitToAppIcon />
                        </IconButton>
                      </Tooltip>
                    </Link>
                  </div>
                  <BlogForm />
                </Fragment>
              ) : (
                <Fragment>
                  <Link to='/login' className={classes.authGrp}>
                    Login
                  </Link>
                  <Link to='/sign-up' className={classes.authGrp}>
                    <Button variant='contained' color='secondary'>
                      Sign up
                    </Button>
                  </Link>
                </Fragment>
              )}
            </Fragment>
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
