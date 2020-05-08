import axios from 'axios';

export const setBlogs = blogs => ({
  type: 'SET_BLOGS',
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
