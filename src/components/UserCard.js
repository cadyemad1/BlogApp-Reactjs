import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import cx from 'clsx';

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

const UserCard = () => {
  const classes = useStyles();
  return (
    <Paper elevation={2} className={cx(classes.flex, classes.paper)}>
      <div className={classes.flex}>
        <Avatar variant='square' className={classes.avatar}>
          C
        </Avatar>
        <Typography component='h3' variant='h6'>
          Cady Emad
        </Typography>
      </div>

      <Button variant='contained' className={classes.btn}>
        Follow
      </Button>
    </Paper>
  );
};

export default UserCard;
