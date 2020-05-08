import axios from 'axios';

export const setBlogs = blogs => ({
  type: 'SET_BLOGS',
  payload: blogs
});

export const fetchBlogs = () => {
  return async dispatch => {
    const { data } = await axios.get('http://localhost:3000/blog/getBlogs');

    dispatch(setBlogs(data));
  };
};
