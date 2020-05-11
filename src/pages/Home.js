import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlogs, setLoading } from '../actions/blogActions';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import cx from 'clsx';

import BlogCard from '../components/BlogCard';
import UserCard from '../components/UserCard';
import Header from '../components/Header';
import Profile from './Profile';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  },
  loading: {
    width: '70%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  }
}));

const Home = () => {
  const classes = useStyles();
  const limit = 3;

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState();

  const blogs = useSelector(state => state.blogs.blogs);
  const loading = useSelector(state => state.blogs.loading);
  const hasMoreBlogs = useSelector(state => state.blogs.hasMoreBlogs);

  const dispatch = useDispatch();

  const observer = useRef();
  const lastBlogRef = useCallback(
    el => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMoreBlogs) {
          setPage(page + 1);
        }
      });
      if (el) observer.current.observe(el);
    },
    [loading]
  );

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const getUserId = userId => {
    setUserId(userId);
  };

  useEffect(() => {
    dispatch(fetchBlogs(page, limit));
  }, [page]);

  return (
    <Fragment>
      <Profile isOpen={isOpen} userId={userId} onToggle={handleClick} />
      <Header />
      <Container fixed className={classes.root}>
        <Grid container justify='center'>
          <Grid item xs={7}>
            {blogs.map((blog, index) => {
              if (blogs.length === index + 1)
                return (
                  <div ref={lastBlogRef} key={blog._id}>
                    <BlogCard
                      handleClick={handleClick}
                      getUserId={getUserId}
                      blog={blog}
                    />
                  </div>
                );
              return (
                <div key={blog._id}>
                  <BlogCard
                    handleClick={handleClick}
                    getUserId={getUserId}
                    blog={blog}
                  />
                </div>
              );
            })}
            {loading && (
              <LinearProgress
                variant='query'
                color='secondary'
                className={classes.loading}
              />
            )}
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
