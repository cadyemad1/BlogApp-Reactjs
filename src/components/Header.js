import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import BlogForm from './BlogForm';
import Search from './Search';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
    height: 80
  },
  navbar: {
    backgroundColor: '#021834',
    borderBottom: '1px solid'
  },
  avatar: {
    marginRight: theme.spacing(2),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.secondary.light
  },
  sectionDesktop: {
    display: 'flex'
  }
}));

const Header = () => {
  const classes = useStyles();

  const search = value => console.log(value);

  return (
    <div className={classes.grow}>
      <AppBar position='static' className={classes.navbar} elevation={4}>
        <Toolbar>
          <Avatar variant='square' className={classes.avatar}>
            B
          </Avatar>
          <Search search={search} />
          <div className={classes.grow} />

          <div className={classes.sectionDesktop}>
            <IconButton color='inherit'>
              <HomeIcon />
            </IconButton>
            <IconButton color='inherit'>
              <PersonIcon />
            </IconButton>
            <BlogForm />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
