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
      return { ...state, blogs: [...state.blogs, ...action.payload] };

    case 'SET_FILTERED_BLOGS':
      return {
        ...state,
        filteredBlogs: [...action.payload]
      };
    case 'HAS_MORE_BLOGS':
      return { ...state, hasMoreBlogs: action.payload };

    case 'DELETE_BLOG':
      return state.blogs.filter(blog => blog.id !== action.payload);

    default:
      return state;
  }
};
export default blogReducer;
