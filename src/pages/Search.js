import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import { Container } from '@material-ui/core';

import Header from '../components/Header';
import BlogCard from '../components/BlogCard';

const Search = () => {
  const blogs = useSelector(state => state.blogs.filteredBlogs);

  return (
    <Fragment>
      <Header />
      <Container maxWidth='sm' style={{ marginTop: 30 }}>
        {blogs.map(blog => {
          return (
            <div key={blog._id}>
              <BlogCard blog={blog} />
            </div>
          );
        })}
        {/* {loading && <LinearProgress variant='query' color='secondary' />} */}
      </Container>
    </Fragment>
  );
};

export default Search;
