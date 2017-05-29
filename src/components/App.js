import React from 'react';
import { Component } from 'react';

export default class App extends Component {
	componentWillMount() {
    //this.props.loadUserFromToken();
  }

  render() {
    return (
      <div>
				I am TopMost Level Container. This whole website renders in me<br></br>
        {this.props.children}
      </div>
    );
  }
}
