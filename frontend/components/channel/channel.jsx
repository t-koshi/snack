import React, { Component } from 'react';
import Modal from 'react-modal';
import ChannelsAsideContainer from './channels_aside_container';
import { withRouter } from 'react-router';
import * as Util from '../../util/util';
import EditProfileContainer from './edit_profile';

class Channel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logoutOpen: false,
      editProfOpen: false
    };

    this._toggleLogout = this._toggleLogout.bind(this);
    this._closeLogout = this._closeLogout.bind(this);
    this._logOutUser = this._logOutUser.bind(this);
    this._editProfile = this._editProfile.bind(this);
    this._onModalClose = this._onModalClose.bind(this);
  }

  componentDidMount() {
    let { channelName } = this.props.router.params;
    this.props.fetchChannels();
    this.props.fetchUsers();
    const fetchChannelName = Util.DmUrlToName(channelName, this.props.currentUser);
    this.props.fetchMessages(fetchChannelName);
    this.props.fetchCurrentChannel(fetchChannelName);
  }

  render() {
    const { currentUser } = this.props;

    const logout = () => {
      return (
        <section className="expand-acct group" >

          <div className="aside-profile group">
            <div className="iconholder">
              <img className="icon2" src={ this.props.currentUser.img_url }></img>
            </div>
            <div className="infoholder">
              <h3>{ this.props.currentUser.username }</h3>
              <h4>{ `@${this.props.currentUser.username}` }</h4>
            </div>
          </div>

          <ul>
            <li onClick={ this._editProfile }> {"Edit Profile"}</li>
            <li onClick={ this._logOutUser }>{"Sign out of snack"}</li>
          </ul>
        </section>
      );
    };

    return (
      <section className="channel-page" onClick={ this._closeLogout }>
        <aside className="user-profile group">

          <section className="acct-settings" onClick={ this._toggleLogout }>
            <h3>My Snackpack<i>{ 'v' }</i></h3>
            <h4>{ this.props.currentUser.username }</h4>
            { this.state.logoutOpen ? logout() : '' }
          </section>

          <section className="users-channels">
          <ChannelsAsideContainer />
          </section>
        </aside>
        { this.props.children }

        <Modal
          isOpen={ this.state.editProfOpen }
          onRequestClose={ this._onModalClose }
          contentLabel="Modal"
          className="edit-profile"
          overlayClassName="modal-overlay"
          onKeyPress={ this._handleEsc }>

          <header >
            <h3>Edit your profile</h3>
            <i onClick={ this._onModalClose }
                className="material-icons">clear</i>
          </header>

          <EditProfileContainer
            closeModal={ this._onModalClose }/>
        </Modal>
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

  _logOutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.router.replace('/');
  }

  _editProfile(e) {
    e.preventDefault();
    this.setState({ editProfOpen: true });
  }

  _onModalClose() {
    this.setState({ editProfOpen: false});
  }

  _handleEsc(e) {
    if (e.keyCode === 27) {
      e.preventDefault();
      this.setState({ modalOpen: false });
    }
  }
}

export default withRouter(Channel);
