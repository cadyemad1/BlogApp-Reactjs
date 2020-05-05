import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {
  Paper,
  Link,
  Typography,
  Button,
  Avatar,
  Drawer
} from '@material-ui/core';
import cx from 'clsx';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import BlogCard from '../components/BlogCard';

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  colFlex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  m: {
    marginTop: 60,
    marginBottom: 10
  },
  mb: {
    marginBottom: 25
  },
  paper: {
    width: 650,
    padding: theme.spacing(4)
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.primary.main
  }
}));

const Profile = ({ isOpen, onToggle }) => {
  const classes = useStyles();

  const toggleDrawer = () => {
    onToggle();
  };

  // useEffect(() => {
  //   console.log('mountedd');
  //   return () => {
  //     console.log('unmount');
  //   };
  // }, []);

  return (
    <Fragment>
      <Drawer anchor='right' open={isOpen} onClose={toggleDrawer}>
        <Paper className={classes.paper}>
          <div className={classes.flex}>
            <div className={classes.flex}>
              <ArrowBackIosIcon fontSize='small' color='secondary' />
              <Link color='secondary'>Back</Link>
            </div>
            <Button variant='contained' color='primary' size='small'>
              Follow
            </Button>
          </div>

          <div className={classes.colFlex}>
            <Avatar variant='rounded' className={cx(classes.avatar, classes.m)}>
              C
            </Avatar>
            <Typography variant='h4' className={classes.mb}>
              Cady Emad
            </Typography>
          </div>
          <BlogCard />
        </Paper>
      </Drawer>
    </Fragment>
  );
};
export default Profile;
