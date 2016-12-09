import React, { Component } from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router';
import Profile from './profile';
import Spinner from '../spinner';

class Channel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.fetching) return <Spinner />;
    return (
      <section className="channel">
        <Profile
          currentUser={ this.props.currentUser }
          logout = { this.props.logout }/>
      </section>
    );
  }
}

export default withRouter(Channel);
