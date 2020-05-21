import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { Switch, Route } from 'react-router-dom';
import axios from 'axios';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { makeStyles } from '@material-ui/core/styles';
import FollowedBlog from './pages/FollowedBlog';
import Search from './pages/Search';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import LinearProgress from '@material-ui/core/LinearProgress';
import { backendUrl } from './config';
import { setAuthUser } from './actions/authActions';

const useStyles = makeStyles(theme => ({
  bg: {
    backgroundColor: '#021834',
    position: 'fixed',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    overflow: 'scroll'
  }
}));

const App = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const getUser = async () => {
    const { data } = await axios.get(`${backendUrl}/user/verify`);
    setLoading(false);
    if (data) {
      dispatch(setAuthUser(data));
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={classes.bg}>
      <ToastContainer />
      {loading ? (
        <LinearProgress
          variant='query'
          color='secondary'
          className={classes.loading}
        />
      ) : (
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/sign-up' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <PrivateRoute path='/followed' exact component={FollowedBlog} />
          <PrivateRoute path='/search' exact component={Search} />
          <Route path='*' component={NotFound} />
        </Switch>
      )}
    </div>
  );
};

export default App;
