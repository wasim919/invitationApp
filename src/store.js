import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const intitialState = {};

const middleWare = [thunk];

const store = createStore(rootReducer, intitialState, composeWithDevTools(applyMiddleware(...middleWare)));

export default store;
