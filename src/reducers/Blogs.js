const initialState = {
  loading: true,
  hasMoreBlogs: true,
  blogs: []
};

const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_BLOGS':
      return { ...state, blogs: [...state.blogs, ...action.payload] };

    case 'HAS_MORE_BLOGS':
      return { ...state, hasMoreBlogs: action.payload };

    default:
      return state;
  }
};
export default blogReducer;
