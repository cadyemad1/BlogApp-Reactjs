import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

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

const Profile = ({ isOpen, onToggle, userId }) => {
  const classes = useStyles();
  const [userBlogs, setUserBlogs] = useState([]);

  const toggleProfile = () => {
    onToggle();
  };

  const getProfile = async () => {
    const { data } = await axios.get(`http://localhost:3000/user?id=${userId}`);
    const { blogs, username, id } = data;
    const blogsByUser = blogs.map(blog => ({
      ...blog,
      author: { _id: id, username: username }
    }));
    console.log('from profile', blogsByUser);
    setUserBlogs(blogsByUser);
  };

  useEffect(() => {
    getProfile();
  }, [userId]);

  return (
    <Fragment>
      <Drawer anchor='right' open={isOpen} onClose={toggleProfile}>
        <Paper className={classes.paper}>
          <div className={classes.flex}>
            <div className={classes.flex}>
              <ArrowBackIosIcon fontSize='small' color='secondary' />
              <Link color='secondary' onClick={toggleProfile}>
                Back
              </Link>
            </div>
            <Button variant='contained' color='primary' size='small'>
              Follow
            </Button>
          </div>

          <div className={classes.colFlex}>
            <Avatar variant='rounded' className={cx(classes.avatar, classes.m)}>
              {userBlogs.length ? userBlogs[0].author.username.charAt(0) : ''}
            </Avatar>
            <Typography variant='h4' className={classes.mb}>
              {userBlogs.length ? userBlogs[0].author.username : ''}
            </Typography>
          </div>
          {userBlogs?.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </Paper>
      </Drawer>
    </Fragment>
  );
};
export default Profile;
