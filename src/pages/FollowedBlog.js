import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback
} from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import LinearProgress from '@material-ui/core/LinearProgress';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { backendUrl } from '../config';
import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import Menu from '../components/Menu';

const useStyles = makeStyles(theme => ({
  ntFnd: {
    color: 'white',
    marginTop: theme.spacing(2)
  }
}));

const FollowedBlog = () => {
  const classes = useStyles();
  const limit = 3;
  const [page, setPage] = useState(1);
  const [followedUsersBlogs, setFollowedUsersBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMoreBlogs, setHasMoreBlogs] = useState(true);

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

  const getBlog = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/user/followed?page=${page}&limit=${limit}`
      );
      setFollowedUsersBlogs(followedUsersBlogs.concat(...data));
      setLoading(false);
    } catch (err) {
      setHasMoreBlogs(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
  }, [page]);

  return (
    <Fragment>
      <Header />
      <Hidden only={['md', 'lg']}>
        <Menu />
      </Hidden>
      <Container maxWidth='sm' style={{ marginTop: 30 }}>
        {!followedUsersBlogs.length && !loading ? (
          <Typography variant='h4' align='center' className={classes.ntFnd}>
            No Blogs Found..
            <Typography variant='h6'>
              Follow other users to see their blogs!
            </Typography>
          </Typography>
        ) : (
          followedUsersBlogs.map((blog, index) => {
            if (followedUsersBlogs.length === index + 1)
              return (
                <div ref={lastBlogRef} key={blog._id}>
                  <BlogCard blog={blog} />
                </div>
              );
            return (
              <div key={blog._id}>
                <BlogCard blog={blog} />
              </div>
            );
          })
        )}
        {loading && <LinearProgress variant='query' color='secondary' />}
      </Container>
    </Fragment>
  );
};

export default FollowedBlog;
