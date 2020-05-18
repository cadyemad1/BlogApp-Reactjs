import React from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Hidden from '@material-ui/core/Hidden';

import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import { makeStyles } from '@material-ui/core/styles';
import FollowedBlog from './pages/FollowedBlog';
import Search from './pages/Search';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import Menu from './components/Menu';

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
  return (
    <div className={classes.bg}>
      <ToastContainer />

      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/sign-up' exact component={Register} />
        <Route path='/login' exact component={Login} />
        <PrivateRoute path='/followed' exact component={FollowedBlog} />
        <PrivateRoute path='/search' exact component={Search} />
        <Route path='*' component={NotFound} />
      </Switch>
    </div>
  );
};

export default App;
