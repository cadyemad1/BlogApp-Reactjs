import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs } from '../actions/blogActions';

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
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  return (
    <Fragment>
      {console.log('BLOGZ->', blogs)}

      <Profile isOpen={isOpen} onToggle={handleClick} />
      <Header />

      <Container fixed className={classes.root}>
        <Grid container justify='center'>
          <Grid item xs={7}>
            {blogs.map(blog => (
              <BlogCard handleClick={handleClick} blog={blog} key={blog._id} />
            ))}
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
