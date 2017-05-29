/*import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { initTypes } from 'actions/KIM';

// Add the global CSS here
import globalCSS from './global.scss';

// Basic rootfile where redux provider and react-router are added in the mix


// Import the reducers are create the store
import kimApp from './reducers';
let store = createStore(kimApp, applyMiddleware(thunk));
store.dispatch(initTypes());

const render = (Component) => {
  ReactDOM.render(
      <Component store = {store}/>,
    document.getElementById('root')
  );
};

render(Root);
*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import Root from './root';


const rootEl = document.getElementById('root');

ReactDOM.render(
  /*<Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Simple Form</h2>
      <SimpleForm onSubmit={showResults} />
      <Values form="simple" />
    </div>
  </Provider>,*/

  <Root store = {store}/>,
  rootEl
);
