import React, { Fragment } from 'react';
import Header from '../components/Header';
import { Container } from '@material-ui/core';
import BlogCard from '../components/BlogCard';

const FollowedBlog = () => {
  return (
    <Fragment>
      <Header />
      <Container maxWidth='sm' style={{ marginTop: 30 }}>
        <BlogCard />
        <BlogCard />
      </Container>
    </Fragment>
  );
};

export default FollowedBlog;
