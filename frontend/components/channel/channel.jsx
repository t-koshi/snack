import React, { Component } from 'react';
import Modal from 'react-modal';
import ChannelsAside from './channels_aside';

class Channel extends Component {
  constructor(props) {
    super(props);

    this.state = {logoutOpen: false};

    this.toggleLogout = this._toggleLogout.bind(this);
    this.closeLogout = this._closeLogout.bind(this);
  }

  componentDidMount() {
    this.props.fetchChannels();
    this.props.fetchUsers();
  }

  render() {
    const { currentUser } = this.props;
    const logout = () => <button className="log-out" onClick={ this.logOutUser }>Log Out</button>;

    return (
      <section className="channel" onClick={ this.closeLogout }>
        <aside className="user-profile group">
          <section className="user" onClick={ this.toggleLogout }>
            <h5>{ currentUser.username }</h5>
            { this.state.logoutOpen ? logout() : '' }
            <button className="acct-settings">{ "v "}</button>
          </section>

          <ChannelsAside
            currentUser={ this.props.currentUser }
            channels = { this.props.channels }
            users = {this.props.users}
            createChannel = {this.props.createChannel}
            />
        </aside>
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

export default Channel;
