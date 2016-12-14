import React, { Component } from 'react';
import Modal from 'react-modal';
import ChannelsAside from './channels_aside';
import { withRouter } from 'react-router';

class Channel extends Component {
  constructor(props) {
    super(props);

    this.state = {logoutOpen: false};

    this.toggleLogout = this._toggleLogout.bind(this);
    this.closeLogout = this._closeLogout.bind(this);
    this.logOutUser = this.logOutUser.bind(this);
  }

  componentDidMount() {
    const { channelName } = this.props.router.params;

    this.props.fetchChannels();
    this.props.fetchUsers();

    if (channelName[0] === '@') {
      this.props.fetchCurrentChannel(channelName.slice(1));
    } else {
      this.props.fetchCurrentChannel(channelName);
    }
  }

  render() {
    const { currentUser } = this.props;
    const logout = () => {
      const usersName = ( this.props.currentUser.name) ?
        this.props.currentUser.name : this.props.currentUser.username;

      return (
        <section className="expand-acct group" >
          <h3>{ this.props.currentUser.username }</h3>
          <h4>{ `@${this.props.currentUser.username}` }</h4>
          <li onClick={ this.logOutUser }>{"Sign out of snack"}</li>
        </section>
      );
    };

    return (
      <section className="channel-page" onClick={ this.closeLogout }>
        <aside className="user-profile group">

          <section className="acct-settings" onClick={ this.toggleLogout }>
            <h3>My Snackpack<i>{ 'v' }</i></h3>
            <h4>{ currentUser.username }</h4>
            { this.state.logoutOpen ? logout() : '' }
          </section>

          <ChannelsAside
            currentUser={ this.props.currentUser }
            channels = { this.props.channels }
            users = {this.props.users}
            createChannel = { this.props.createChannel }
            currentChannel = { this.props.currentChannel }
            fetchCurrentChannel = { this.props.fetchCurrentChannel }
            />
        </aside>
        { this.props.children }
      </section>
    );
  }

  _toggleLogout(e) {
    e.preventDefault();
    e.stopPropagation();
    const newLogout = !this.state.logoutOpen;
    this.setState({ logoutOpen: newLogout });
  }

  _closeLogout(e) {
    e.preventDefault();
    this.setState({ logoutOpen: false });
  }

  logOutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.router.replace('/');
  }
}

export default withRouter(Channel);
