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
      usersList: false
    };

    this.handleSubmit = this._handleSubmit.bind(this);
    this.enterField = this._enterField.bind(this);
    this.redirect = this._redirect.bind(this);
    this.togglePrivacy = this._togglePrivacy.bind(this);
    this.hideUsers = this._hideUsers.bind(this);
    this.showUsers = this._showUsers.bind(this);
    this.addMembers = this._addMembers.bind(this);
    this.updateFilter = this._updateFilter.bind(this);
    this.deleteInvite = this._deleteInvite.bind(this);
    this.clickDeleteInvite = this._clickDeleteInvite.bind(this);
  }

  render() {
    let disabled = (this.state.name === '') ? true : false;
    let privacy = (this.state.private) ? "Private" : "Public";
    const { members, usersToRender } = this.state;

    const filteredUsers = this._filteredUsers();

    const usersIndex = () => {
      return (
        <ul className="user-index group">
          { filteredUsers.map((user, idx) =>
              <ul className="users-index" key={ idx } onMouseDown={ this.addMembers }>
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
                <span className="invited-user"
                  key={ idx }
                  onClick={ this.clickDeleteInvite }>
                  { member }
                </span>
            )}
          </ul>
        );
      }
    };

    return (
      <section className="new-channel-modal group">
        <h3>Create a channel</h3>
        <p>{"Channels are where your team communicates. They're best when organized around a topic: #chips, for example."}</p>

        <form className="new-channel-form" onSubmit={ this.handleSubmit }>
          <button className="privacy-button" onClick={ this.togglePrivacy }><span>Public</span></button>
          <label>Name</label>
          <input onChange={ this.enterField("name") }
            className="wide-inp"
            type="text"
            placeholder="e.g. chips"/>
          <p>{ "Names must be lowercase, with no spaces, and unique." }</p>

          <label>Purpose <i>(optional)</i></label>
          <input onChange={ this.enterField("purpose") }
            type="text"
            className="wide-inp"/>
          <span>{ "What's this channel about?" }</span>

          <label>Send invites to: <i>(optional)</i></label>

          <section className="invites group">
            { invitedUsers() }
            <input
              className="filter-input"
              onFocus={ this.showUsers }
              onBlur={ this.hideUsers }
              onChange={ this.updateFilter }
              ref="filterInput"
              onKeyDown={ this.deleteInvite }
              value={ this.state.filter}/>
          </section>

          { this.state.usersList ? usersIndex() : '' }

          <button>cancel</button>
          <input type="submit" disabled={ disabled } value="Create channel"/>
        </form>
      </section>
    );
  }

  _deleteInvite(e) {
    let newMembers = this.state.members;
    if (e.keyCode === 8 && !this.state.filter) {
      e.preventDefault();
      newMembers = newMembers.slice(0, -1);
    }

    this.setState({members: newMembers});
  }

  _clickDeleteInvite(e) {
    let newMembers = this.state.members;
    e.preventDefault();
    const idxToDelete = newMembers.indexOf(e.currentTarget.value);
    newMembers.splice(idxToDelete, 1);
    this.setState({members: newMembers});
  }

  _addMembers(e) {
    e.preventDefault();
    const newMembers = _.union(this.state.members, [e.currentTarget.lastChild.innerText]);
    this.setState({ members: newMembers, filter: ''});
    $(this.refs.filterInput).focus();
  }

  _updateFilter(e) {
    this.setState({filter: e.currentTarget.value});
  }

  _filteredUsers () {
    if (!this.state.filter) {
      return this.props.users.filter((user) => {
        return (this.state.members.indexOf(user.username) === -1 &&
        user.username !== currentUser.username);
      });
    } else {
      return this.props.users.filter((user) => {
        if (user.name) {
          return (user.username.toLowerCase().indexOf(this.state.filter) > -1 ||
          user.name.toLowerCase().indexOf(this.state.filter) > -1) &&
          this.state.members.indexOf(user.username) === -1 &&
          user.username !== currentUser.username;
        } else {
          return (user.username.toLowerCase().indexOf(this.state.filter) > -1 &&
          this.state.members.indexOf(user.username) === -1 &&
          user.username !== currentUser.username);
        }
      });
    }
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
    const newChannel = _.merge({}, this.state);
    this.props.createChannel(newChannel).then(() => this.redirect());
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
