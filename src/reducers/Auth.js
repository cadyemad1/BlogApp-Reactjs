const initialState = { isAuthenticated: false, user: {} };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH_USER':
      return { isAuthenticated: true, user: action.payload };

    default:
      return state;
  }
};

export default authReducer;
