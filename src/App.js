import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BlogForm from './components/BlogForm';

const App = () => {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path='/sign-up' exact component={Register} />
          <Route path='/login' exact component={Login} />
        </Switch>
      </Router>

      <BlogForm></BlogForm>
    </Fragment>
  );
};

export default App;
