import axios from 'axios';

export const setBlogs = blogs => ({
  type: 'SET_BLOGS',
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

export const fetchBlogs = (page, limit) => {
  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `http://localhost:3000/blog/getBlogs?page=${page}&limit=${limit}`
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
  console.log('from action ->', value);

  return async dispatch => {
    dispatch(setLoading(true));
    try {
      const { data } = await axios.get(
        `http://localhost:3000/blog/search?searchquery=${value}`
      );
      console.log('data->', data);

      dispatch(setFilteredBlogs(data));
      dispatch(setLoading(false));
    } catch (err) {
      console.log('in catch');

      // dispatch(hasMoreBlogs(false));
      // dispatch(setLoading(false));
    }
  };
};

export const deleteBlog = id => ({
  type: 'DELETE_BLOG',
  payload: id
});
