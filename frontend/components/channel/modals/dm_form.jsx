import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link, withRouter } from 'react-router';
import { merge, union } from 'lodash';

class DMForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      private: true,
      filter: '',
      members: []
    };

    this._handleSubmit = this._handleSubmit.bind(this);
    this._enterField = this._enterField.bind(this);
    this._redirect = this._redirect.bind(this);
    this._addMembers = this._addMembers.bind(this);
    this._updateFilter = this._updateFilter.bind(this);
    this._deleteInvite = this._deleteInvite.bind(this);
    this._clickDeleteInvite = this._clickDeleteInvite.bind(this);
    this._goToInput = this._goToInput.bind(this);
  }

  render() {
    let disabled = (this.state.name === '') ? true : false;
    let privacy = (this.state.private) ? "Private" : "Public";
    const { members, usersToRender } = this.state;

    const filteredUsers = this._filteredUsers();

    const usersIndex = () => {
      return (
        <ul className="user-index dm group" >
          { filteredUsers.map((user, idx) =>
              <li className="detail-box dm group" key={ idx }>
                <ul className="user-details dm group" onMouseDown={ this._addMembers }>
                  <h5>{ user.username }</h5>
                  <h6>{ user.name }</h6>
                </ul>
              </li>
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
                  onClick={ this._clickDeleteInvite }>
                  { member }
                </span>
            )}
          </ul>
        );
      }
    };

    const memberLimit = () => {
      if (this.state.members.length) {
        return `You can add ${ 7 - this.state.members.length} people`;
      }
    };

    return (
      <section className="new-dm-modal group">
        <h3>Direct Messages</h3>
        <section className="dm-invites group">
          <section
            className="dm-filters group"
            onClick={ this._goToInput }>
            { invitedUsers() }
            <input
              type="text"
              className="dm-invite-filter group"
              onChange={ this._updateFilter }
              ref="filterInput"
              placeholder="Find or start a conversation"
              onKeyDown={ this._deleteInvite }
              value={ this.state.filter}
            />
          </section>

          <button className="dm-go"
            onClick={ this._handleSubmit }>Go
          </button>

          <span className="member-limit">{ memberLimit() }</span>
        </section>

        <div className="list-top">
          { usersIndex() }
        </div>

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
    if (this.state.members.length < 7) {
      e.preventDefault();
      const newMembers = _.union(this.state.members, [e.currentTarget.firstChild.innerText]);
      this.setState({ members: newMembers, filter: ''});
    }
    $(this.refs.filterInput).focus();
  }

  _updateFilter(e) {
    this.setState({filter: e.currentTarget.value});
  }

  _goToInput(e) {
    e.preventDefault();
    $(this.refs.filterInput).focus();
  }

  _filteredUsers () {
    if (!this.state.filter) {
      return this.props.users.filter((user) => {
        return (this.state.members.indexOf(user.username) === -1 &&
        user.username !== this.props.currentUser.username);
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

  _handleSubmit(e) {
    e.preventDefault();
    let newChannel = _.merge({}, this.state);
    newChannel.members = ([this.props.currentUser.username].concat(this.state.members)).sort();
    newChannel.name = newChannel.members.sort().join(',');

    if (this._allDMNames().indexOf(newChannel.name) > -1){
      this.props.closeModal();
    } else {
      this.props.createChannel(newChannel).then(() => this.props.closeModal());
    }
  }

  _allDMNames () {
    return this.props.DMs.map((dm) => dm.name);
  }

  _enterField(field){
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  _redirect() {
    this.props.router.replace('/messages');
  }
}

export default withRouter(DMForm);
