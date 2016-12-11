import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link, withRouter } from 'react-router';
import { merge, union } from 'lodash';

class ChannelForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      purpose: '',
      private: false,
      filter: '',
      members: [],
      usersList: false,
      usersToRender: this.props.users.map((user) => user.username)
    };

    this.handleSubmit = this._handleSubmit.bind(this);
    this.enterField = this._enterField.bind(this);
    this.redirect = this._redirect.bind(this);
    this.togglePrivacy = this._togglePrivacy.bind(this);
    this.hideUsers = this._hideUsers.bind(this);
    this.showUsers = this._showUsers.bind(this);
    this.handleInvites = this._handleInvites.bind(this);
    this.addMembers = this._addMembers.bind(this);
    this.setFilter = this._setFilter.bind(this);
  }

  render() {
    let disabled = (this.state.name === '') ? true : false;
    let privacy = (this.state.private) ? "Private" : "Public";
    const { members, usersToRender } = this.state;

    const usersIndex = () => {
      return (
        <ul className="user-index group">
          { usersToRender.map((user, idx) =>
              <ul className="users-index" key={ idx } onClick={ this.addMembers }>
                <li>{ user.name }</li>
                <li>{ user.username }</li>
              </ul>
          )}
        </ul>
      );
    };

    const invitedUsers = () => {
      if (this.state.members.length) {
        return (
          <ul className="invited-users group">
            { members.map((member, idx) =>
                <span className="invited-user" key={ idx }>{ member }</span>
            )}
          </ul>
        );
      }
    };

    return (
      <section className="new-channel-modal group" onClick={ this.hideUsers }>
        <h3>Create a channel</h3>
        <p>{"Channels are where your team communicates. They're best when organized around a topic: #chips, for example."}</p>

        <form className="new-channel-form">
          <button className="privacy-button" onClick={ this.togglePrivacy }><span>Public</span></button>
          <label>Name</label>
          <input onChange={ this.enterField("name") }
            type="text"
            placeholder="e.g. chips"/>
          <p>{ "Names must be lowercase, with no spaces, and unique." }</p>

          <label>Purpose <i>(optional)</i></label>
          <input onChange={ this.enterField("purpose") }
            type="text"/>
          <span>{ "What's this channel about?" }</span>

          <label>Send invites to: <i>(optional)</i></label>
          <div
            className="invites"
            contentEditable="true"
            onClick={ this.showUsers }
            onKeyDown={ this.handleInvites }>

            { invitedUsers() }
          </div>

          { this.state.usersList ? usersIndex() : '' }

          <input type="submit" disabled={ disabled } value="Create channel"/>
        </form>
      </section>
    );
  }

  _filterUsers() {
    const filteredUsers = this.state.usersToRender.filter((user) => {
      if (user.name) {
        return user.username.toLowerCase().indexOf(this.state.filter) > -1 ||
        user.name.toLowerCase().indexOf(this.state.filter) > -1;
      } else {
        return user.username.toLowerCase().indexOf(this.state.filter) > -1;
      }
    });

    this.setState({ usersToRender: filteredUsers });
  }

  _addMembers(e) {
    e.preventDefault();
    const newUsersToRender = this.state.usersToRender.delete;
    const newMembers = this.state.members.concat(e.target.innerText);
    this.setState({ members: newMembers});
  }

  _handleInvites(e) {
    if (e.keyCode === 8 && this.state.members.length) {
      e.preventDefault();
      const newUsersToRender = this.state.usersToRender.concat(this.state.members[this.state.members.length - 1]);
      const newMembers = this.state.members.slice(0, -1);
      this.setState({members: newMembers, usersToRender: newUsersToRender});
    } else {
      this.setFilter(e);
    }
  }

  _setFilter(e) {
    e.preventDefault();
    this.setState({filter: e.currentTarget.value.toLowerCase()});
  }

  _showUsers(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({usersList: true});
  }

  _hideUsers(e) {
    e.preventDefault();
    this.setState({usersList: false});
  }

  _handleSubmit(e) {
    e.preventDefault();
    const newChannel = merge({}, this.state);
    this.props.createChannel(channel).then(() => this.redirect());
  }

  _enterField(field){
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  _togglePrivacy(e) {
    e.preventDefault();
    this.setState({private: !this.state.private});
  }

  _redirect() {
    this.props.router.replace('/messages');
  }
}

export default withRouter(ChannelForm);
