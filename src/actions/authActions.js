export const setAuthUser = user => ({
  type: 'SET_AUTH_USER',
  payload: user
});

export const setFollowers = userId => ({
  type: 'SET_FOLLOWERS',
  payload: userId
});
