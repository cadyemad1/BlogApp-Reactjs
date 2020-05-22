import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Hidden from '@material-ui/core/Hidden';

import { backendUrl } from '../config';
import BlogCard from '../components/BlogCard';
import Header from '../components/Header';
import Profile from './Profile';
import { fetchBlogs, resetBlogs } from '../actions/blogActions';
import RecommendedUsers from '../components/RecommendedUsers';
import Menu from '../components/Menu';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 50
  },
  loading: {
    width: '70%',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4)
  },
  rec: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
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
  const user = useSelector(state => state.authUser.user);

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

  const handleClick = async () => {
    setIsOpen(!isOpen);
  };

  const getUserId = userId => {
    setUserId(userId);
  };

  useEffect(() => {
    dispatch(fetchBlogs(page, limit));
  }, [page]);

  useEffect(() => {
    return () => {
      dispatch(resetBlogs());
    };
  }, []);
  return (
    <Fragment>
      {isOpen && (
        <Profile isOpen={isOpen} userId={userId} onToggle={handleClick} />
      )}
      <Header />
      <Container fixed className={classes.root}>
        <Hidden only={['md', 'lg']}>
          <Menu />
        </Hidden>
        <Grid container justify='center'>
          <Grid item xs={11} md={7}>
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
          {user._id && (
            <Grid item xs={0} md={4} className={classes.rec}>
              <RecommendedUsers />
            </Grid>
          )}
        </Grid>
      </Container>
    </Fragment>
  );
};

export default Home;
