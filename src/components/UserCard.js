import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import cx from 'clsx';

import { backendUrl } from '../config';
import { setFollowers } from '../actions/authActions';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    marginTop: 20
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    marginRight: 10
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  btn: {
    backgroundColor: '#021935',
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.secondary.main
    }
  }
}));

const UserCard = ({ user, newFollowerAdded }) => {
  const [isFollowed, setIsFollowed] = useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  const manageFollow = () => {
    setIsFollowed(!isFollowed);
    newFollowerAdded();

    if (user) {
      dispatch(setFollowers(user._id));
      axios.patch(`${backendUrl}/user/${user._id}`);
    }
  };

  return (
    <Paper elevation={2} className={cx(classes.flex, classes.paper)}>
      <div className={classes.flex}>
        <Avatar variant='square' className={classes.avatar}>
          {user.username.charAt(0)}
        </Avatar>
        <Typography component='h3' variant='h6'>
          {user.username}
        </Typography>
      </div>

      <Button
        variant='contained'
        className={classes.btn}
        onClick={manageFollow}
      >
        {isFollowed ? 'Unfollow' : 'Follow'}
      </Button>
    </Paper>
  );
};

export default UserCard;
