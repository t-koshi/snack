import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import Header from './header';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="homepage">
        <Header page={ '/' } currentUser={ this.props.currentUser }/>
      </nav>
    );
  }
}

export default withRouter(Landing);
