import React from 'react';
import { Link, withRouter, Redirect } from 'react-router';
import Header from './header';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="homepage">
        <Header page={ '/' }/>
      </nav>
    );
  }
}

export default withRouter(Home);
