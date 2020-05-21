const initialState = {
  isAuthenticated: false,
  user: {
    username: '',
    email: '',
    followingList: [],
    password: ''
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH_USER':
      return {
        isAuthenticated: true,
        user: { ...action.payload }
      };

    case 'SET_FOLLOWERS':
      //check if user exists or no
      const userId = action.payload;
      let { followingList } = state.user;
      let followers = followingList.includes(userId)
        ? followingList.filter(f => f !== userId)
        : [...state.user.followingList, action.payload];

      return {
        ...state,
        user: {
          ...state.user,
          followingList: followers
        }
      };

    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        isAuthenticated: false,
        user: {
          username: '',
          email: '',
          followingList: [],
          password: ''
        }
      };
    default:
      return state;
  }
};

export default authReducer;
