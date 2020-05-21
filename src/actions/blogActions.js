import axios from 'axios';
import { backendUrl } from '../config';

export const setBlogs = blogs => ({
  type: 'SET_BLOGS',
  payload: blogs
});
export const resetBlogs = blogs => ({
  type: 'RESET_BLOGS',
  payload: blogs
});
export const setFilteredBlogs = blogs => ({
  type: 'SET_FILTERED_BLOGS',
  payload: blogs
});
export const setLoading = isLoading => ({
  type: 'SET_LOADING',
  payload: isLoading
});

export const hasMoreBlogs = flag => ({
  type: 'HAS_MORE_BLOGS',
  payload: flag
});

export const addBlog = blog => ({
  type: 'ADD_BLOG',
  payload: blog
});

export const updateBlog = blog => ({
  type: 'UPDATE_BLOG',
  payload: blog
});
export const fetchBlogs = (page, limit) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `${backendUrl}/blog/getBlogs?page=${page}&limit=${limit}`
      );
      dispatch(setBlogs(data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(hasMoreBlogs(false));
      dispatch(setLoading(false));
    }
  };
};

export const searchBlogs = value => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `${backendUrl}/blog/search?searchquery=${value}`
      );

      dispatch(setFilteredBlogs(data));
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(setLoading(false));
    }
  };
};

export const deleteBlog = id => ({
  type: 'DELETE_BLOG',
  payload: id
});
