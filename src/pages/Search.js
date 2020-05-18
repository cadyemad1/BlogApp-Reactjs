import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

import Header from '../components/Header';
import BlogCard from '../components/BlogCard';
import Menu from '../components/Menu';

const useStyles = makeStyles(theme => ({
  ntFnd: {
    color: 'white',
    marginTop: theme.spacing(2)
  }
}));
const Search = () => {
  const classes = useStyles();
  const blogs = useSelector(state => state.blogs.filteredBlogs);

  return (
    <Fragment>
      <Header />
      <Hidden only={['md', 'lg']}>
        <Menu />
      </Hidden>
      {!blogs.length ? (
        <Typography variant='h4' align='center' className={classes.ntFnd}>
          No Blogs Found..
          <Typography variant='h6'>Try to search for another!</Typography>
        </Typography>
      ) : (
        <Container maxWidth='sm' style={{ marginTop: 30 }}>
          {blogs.map(blog => {
            return (
              <div key={blog._id}>
                <BlogCard blog={blog} />
              </div>
            );
          })}
        </Container>
      )}
    </Fragment>
  );
};

export default Search;
