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

      //edit data
      if (data.length && data[0].username) {
        const newData = data.map(el => {
          return el.blogs?.map(blog => ({
            ...blog,
            author: { _id: el.id, username: el.username }
          }));
        });
        const blogs = newData.flat();
        dispatch(setFilteredBlogs(blogs));
        dispatch(setLoading(false));
        return;
      }

      // console.log('Action data->', blogs);
      dispatch(setFilteredBlogs(data));
      dispatch(setLoading(false));
    } catch (err) {
      console.log('in catch', err);

      // dispatch(hasMoreBlogs(false));
      // dispatch(setLoading(false));
    }
  };
};

export const deleteBlog = id => ({
  type: 'DELETE_BLOG',
  payload: id
});
