import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import BlogCard from '../components/BlogCard';
import UserCard from '../components/UserCard';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Container fixed className={classes.root}>
      <Grid container justify='center'>
        <Grid item xs={7}>
          <BlogCard />
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
  );
};

export default Home;
