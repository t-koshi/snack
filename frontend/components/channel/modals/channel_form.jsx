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

    const userDetails = (user, idx) => {
      if (user.name) {
        return (
          <ul className="user-details channel"
            key={ idx }
            onMouseDown={ this.addMembers }>
            <h5>{ user.name }</h5>
            <h6>{ user.username }</h6>
          </ul>);
      } else {
        return (
          <ul className="user-details channel"
            key={ idx }
            onMouseDown={ this.addMembers }>
            <h4>{ user.username }</h4>
          </ul>
        );
      }
    };

    const usersIndex = () => {
      return (
        <ul className="user-index channel group">
          { filteredUsers.map((user, idx) =>
            <li className="detail-box">
              { userDetails(user, idx)}
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
                  onClick={ this.clickDeleteInvite }>
                  { member }<i className="material-icons">close</i>
                </span>
            )}
          </ul>
        );
      }
    };

    const privacyButton = () => {
      if(this.state.private) {
        return (
          <button
            onClick={ this.togglePrivacy }
            className="private">
            <i className="privatebutton"></i>
            <span>Private</span>
          </button>
        );
      } else {
        return (
          <button
            onClick={ this.togglePrivacy }
            className="public">
            <span>Public</span>
            <i className="publicbutton"></i>
          </button>
        );
      }
    };

    return (
      <section className="new-channel-modal group">
        <h3>Create a channel</h3>
        <p className="header-text">{"Channels are where your team communicates. They're best when organized around a topic: --#chips, for example."}</p>


        <form className="new-channel-form" onSubmit={ this.handleSubmit }>
          <section className="privacy-button">
            { privacyButton() }
          </section>

            <label>Name</label>
            <section className="input-wrappers group">
            <input onChange={ this.enterField("name") }
              className="wide-inp"
              type="text"
              placeholder="e.g. chips"/>
            </section>
            <p>{ "Names must be lowercase, with no spaces, and unique." }</p>

            <label>Purpose <i>(optional)</i></label>
            <section className="input-wrappers group">
            <input onChange={ this.enterField("purpose") }
              type="text"
              className="wide-inp"/>
          </section>
            <p>{ "What's this channel about?" }</p>


          <label>Send invites to: <i>(optional)</i></label>
            <section className="input-wrappers group"
              onClick={ this._goToInput.bind(this) }>
            { invitedUsers() }
            <input
              className="filter-input"
              onFocus={ this.showUsers }
              onBlur={ this.hideUsers }
              onChange={ this.updateFilter }
              ref="filterInput"
              onKeyDown={ this.deleteInvite }
              value={ this.state.filter }/>
          </section>
          <div className="list-top">
            { this.state.usersList ? usersIndex() : '' }
          </div>
          <section className="buttons group">
            <input type="submit" disabled={ disabled } value="Create channel"/>
          </section>
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

  _goToInput(e) {
    e.preventDefault();
    $(this.refs.filterInput).focus();
  }

  _updateFilter(e) {
    this.setState({filter: e.currentTarget.value});
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
          user.username !== this.props.currentUser.username;
        } else {
          return (user.username.toLowerCase().indexOf(this.state.filter) > -1 &&
          this.state.members.indexOf(user.username) === -1 &&
          user.username !== this.props.currentUser.username);
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
    this.props.createChannel(newChannel).then(() => this.props.closeModal());
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
