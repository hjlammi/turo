import React from 'react';
import './index.css';
import createSagaMiddleware from 'redux-saga';
import { render } from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/index';
import * as serviceWorker from './serviceWorker';
import App from './containers/AppContainer';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  /* eslint-disable global-require */
  const { logger } = require('redux-logger');
  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
