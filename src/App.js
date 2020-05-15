import React, { Fragment } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import Home from './pages/Home';
import { makeStyles } from '@material-ui/core/styles';
import FollowedBlog from './pages/FollowedBlog';
import Search from './pages/Search';

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
        <Route path='/followed' exact component={FollowedBlog} />
        <Route path='/search' exact component={Search} />
      </Switch>
    </div>
  );
};

export default App;
