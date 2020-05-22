import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
import LinearProgress from '@material-ui/core/LinearProgress';

import { backendUrl } from '../config';
import BlogCard from '../components/BlogCard';
import { setFollowers } from '../actions/authActions';

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
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      width: '375px'
    }
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
  const [isFollowed, setIsFollowed] = useState(false);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.authUser.user);
  const dispatch = useDispatch();

  const toggleProfile = () => {
    onToggle();
  };

  const getProfile = async () => {
    const { data } = await axios.get(`${backendUrl}/user?id=${userId}`);
    const { blogs, username, id } = data;
    const blogsByUser = blogs.map(blog => ({
      ...blog,
      author: { _id: id, username: username }
    }));
    setUserBlogs(blogsByUser);
    setLoading(false);
  };

  const manageFollow = () => {
    setIsFollowed(!isFollowed);

    const userId = userBlogs.length ? userBlogs[0].author._id : -1;
    if (userId !== -1) {
      dispatch(setFollowers(userId));
      axios.patch(`${backendUrl}/user/${userId}`);
    }
  };

  const checkProfileOwner = () => {
    if (user.id && userBlogs?.length) {
      return user.id !== userBlogs[0].author._id;
    }
    return false;
  };

  useEffect(() => {
    if (userBlogs.length) {
      if (
        user.followingList?.findIndex(
          user => user === userBlogs[0].author._id
        ) !== -1
      ) {
        setIsFollowed(true);
      } else {
        setIsFollowed(false);
      }
    }
  }, [userBlogs]);

  useEffect(() => {
    getProfile();
  }, [userId]);

  return (
    <Fragment>
      <Drawer anchor='right' open={isOpen} onClose={toggleProfile}>
        {loading ? (
          <LinearProgress
            variant='query'
            color='secondary'
            className={classes.loading}
          />
        ) : (
          <Paper className={classes.paper}>
            <div className={classes.flex}>
              <div className={classes.flex}>
                <ArrowBackIosIcon fontSize='small' color='secondary' />
                <Link color='secondary' onClick={toggleProfile}>
                  Back
                </Link>
              </div>
              {checkProfileOwner() && (
                <Button
                  variant='contained'
                  color='primary'
                  size='small'
                  onClick={manageFollow}
                >
                  {isFollowed ? 'unfollow' : 'Follow'}
                </Button>
              )}
            </div>

            <div className={classes.colFlex}>
              <Avatar
                variant='rounded'
                className={cx(classes.avatar, classes.m)}
              >
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
        )}
      </Drawer>
    </Fragment>
  );
};
export default Profile;
