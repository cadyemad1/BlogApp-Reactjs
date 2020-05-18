import React from 'react';
import { Link } from 'react-router-dom';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  txt: {
    color: 'white',
    margin: theme.spacing(6)
  },
  m: {
    marginLeft: theme.spacing(6),
    textDecoration: 'none'
  }
}));
const NotFound = () => {
  const classes = useStyles();

  return (
    <Container>
      <Typography variant='h2' className={classes.txt}>
        Page Not Found!
      </Typography>
      <Link to='/' className={classes.m}>
        <Button variant='contained' color='secondary'>
          Go Back
        </Button>
      </Link>
    </Container>
  );
};

export default NotFound;
