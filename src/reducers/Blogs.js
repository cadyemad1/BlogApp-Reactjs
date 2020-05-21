const initialState = {
  loading: true,
  hasMoreBlogs: true,
  blogs: [],
  filteredBlogs: []
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_BLOGS':
      if (state.blogs.length) {
        const res = action.payload.reduce(
          (acc, el) => {
            return state.blogs.findIndex(blog => blog._id === el._id) !== -1
              ? state.blogs
              : [...acc, el];
          },
          [...state.blogs]
        );
        return { ...state, blogs: res };
      }
      return { ...state, blogs: [...state.blogs, ...action.payload] };

    case 'RESET_BLOGS':
      return { ...state, blogs: [] };

    case 'ADD_BLOG':
      return { ...state, blogs: [action.payload, ...state.blogs] };

    case 'UPDATE_BLOG':
      const blogs = state.blogs.map(blog => {
        return blog._id !== action.payload.id
          ? blog
          : { ...blog, ...action.payload };
      });
      return { ...state, blogs };

    case 'SET_FILTERED_BLOGS':
      return {
        ...state,
        hasMoreBlogs: true,
        filteredBlogs: [...action.payload]
      };
    case 'HAS_MORE_BLOGS':
      return { ...state, hasMoreBlogs: action.payload };

    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog._id !== action.payload),
        filteredBlogs: state.filteredBlogs.filter(
          blog => blog._id !== action.payload
        )
      };

    default:
      return state;
  }
};
export default blogReducer;
