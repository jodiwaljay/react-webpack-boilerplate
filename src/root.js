import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

import App from './pages/App';
/*
import SignUp from './containers/SignUpFormContainer'
import Home from './pages/Home'
*/
const Root = ({ store }) => (
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={App}>
				{/*<IndexRoute component = {Home}/>
				<Route path="signup" component={SignUp} />*/}
			</Route>

		</Router>
	</Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
