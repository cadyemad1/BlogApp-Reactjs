import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import BlogForm from './BlogForm';
import { logout } from '../actions/authActions';

const useStyles = makeStyles(theme => ({
  menu: {
    color: 'white',
    position: 'absolute',
    right: 10,
    top: 15,
    zIndex: 10
  },
  drawer: {
    width: 240,
    height: 400,
    position: 'absolute',
    flexShrink: 0
  },
  drawerPaper: {
    width: 240,
    backgroundColor: '#021834',
    borderLeft: '1px solid rgba(255, 255, 255, 0.8)'
  },
  color: {
    color: 'white'
  },
  listItem: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.8)',
    color: 'white',
    padding: theme.spacing(2)
  },
  link: {
    textDecoration: 'none',
    color: 'white'
  },
  form: {
    position: 'relative',
    bottom: 0,
    right: 0
  }
}));

const Menu = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const user = useSelector(state => state.authUser.user);
  const dispatch = useDispatch();

  const handleMenu = () => {
    setOpen(!open);
  };

  const Logout = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <IconButton edge='start' className={classes.menu} onClick={handleMenu}>
        <MenuIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
        open={open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleMenu} className={classes.color}>
            <CloseIcon />
          </IconButton>
        </div>

        {user._id ? (
          <Fragment>
            <List>
              <ListItem button className={classes.listItem}>
                <Link to='/' className={classes.link}>
                  Home
                </Link>
              </ListItem>
              <ListItem button className={classes.listItem}>
                <Link to='/followed' className={classes.link}>
                  Followed Blogs
                </Link>
              </ListItem>
              <ListItem button className={classes.listItem}>
                <Link to='/' onClick={Logout} className={classes.link}>
                  Logout
                </Link>
              </ListItem>
              <div className={classes.form}>
                <BlogForm />
              </div>
            </List>
          </Fragment>
        ) : (
          <List>
            <ListItem button className={classes.listItem}>
              <Link to='/login' className={classes.link}>
                Login
              </Link>
            </ListItem>

            <ListItem button className={classes.listItem}>
              <Link to='/sign-up' className={classes.link}>
                Register
              </Link>
            </ListItem>
          </List>
        )}
      </Drawer>
    </Fragment>
  );
};

export default Menu;
