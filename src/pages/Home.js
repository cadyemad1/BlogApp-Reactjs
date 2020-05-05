import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import cx from 'clsx';

import BlogCard from '../components/BlogCard';
import UserCard from '../components/UserCard';
import Header from '../components/Header';
import Profile from './Profile';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  }
}));

const Home = () => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    console.log('useEffect');
    axios.get('http://localhost:3000/user').then(res => console.log(res));
  }, []);

  return (
    <Fragment>
      <Profile isOpen={isOpen} onToggle={handleClick} />
      <Header />

      <Container fixed className={classes.root}>
        <Grid container justify='center'>
          <Grid item xs={7}>
            <BlogCard handleClick={handleClick} />
            <BlogCard />
          </Grid>
          <Grid item xs={4}>
            <Paper style={{ padding: 20 }}>
              <Typography variant='h5'>Recomended Blogs</Typography>
              <Divider />
              <UserCard />
              <UserCard />
              <UserCard />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Home;
