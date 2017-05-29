import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import { AppContainer } from 'react-hot-loader';

import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Root from './root';


const rootEl = document.getElementById('root');

ReactDOM.render(

<AppContainer>
  <Root store = {store}/>
  </AppContainer>,
  rootEl
);


// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./root', () => {
    render(Root)
  });
}
