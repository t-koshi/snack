import React from 'react';
import { Link, withRouter, Redirect } from 'react-router';
import Header from './header';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleClickHome = this._handleClickHome.bind(this);
  }

  render() {
    return (
      <div className="homepage">
        <Header page={ "root" } />
      </div>
    );
  }

  _handleClickHome(e) {
    e.preventDefault();
    this.props.router.replace('/');
  }
}

export default withRouter(Home);
