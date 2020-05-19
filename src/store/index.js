import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index';

const middleWares = [thunk];
const intialState = {};

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

const store = createStore(
  rootReducer,
  intialState,
  composeEnhancers(applyMiddleware(...middleWares))
);

export default store;
