import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';
import { Dashboard } from './components';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Route exact path='/' component={App} />
        <Route exact path='/dashboard' component={Dashboard} />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
