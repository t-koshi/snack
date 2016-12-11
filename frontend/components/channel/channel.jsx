import React, { Component } from 'react';
import Modal from 'react-modal';
import Profile from './profile';

class Channel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="channel">
        <Profile
          currentUser={ this.props.currentUser }
          fetching = { this.props.fetching }
          channels = { this.props.channels }
          logout = { this.props.logout }
          fetchChannels = { this.props.fetchChannels }
          fetchUsers = { this.props.fetchUsers }
          users = {this.props.users}
          createChannel = {this.props.createChannel}
          />
      </section>
    );
  }
}

export default Channel;
