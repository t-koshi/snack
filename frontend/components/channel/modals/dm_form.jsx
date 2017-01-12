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
    this._addMembers = this._addMembers.bind(this);
    this._updateFilter = this._updateFilter.bind(this);
    this._deleteInvite = this._deleteInvite.bind(this);
    this._clickDeleteInvite = this._clickDeleteInvite.bind(this);
    this._goToInput = this._goToInput.bind(this);
  }

  render() {
    let privacy = (this.state.private) ? "Private" : "Public";
    const { members, usersToRender } = this.state;

    const filteredUsers = this._filteredUsers();

    const usersIndex = () => {
      return (
        <ul className="user-index dm group" >
          { filteredUsers.map((user, idx) =>
              <li className="detail-box dm group" key={ idx }>
                <ul className="user-details dm group" onMouseDown={ this._addMembers }>
                  <img className="icon2"
                    src={ user.img_url }/>
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
                <li className="invited-user"
                  key={ idx }
                  onClick={ this._clickDeleteInvite }
                  color="#fff">
                  <img className="icon5"
                    src={ member.img_url }/>
                  <span>{ member.username }</span>
                  <span>x</span>
                </li>
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

    const placeHolder = () => {
      return (this.state.members.length ) ? "" : "Find or start a convo";
    };

    let disabled = (this.state.members.length) ? false : true;

    return (
      <section className="new-dm-modal group">
        <h3>Direct Messages</h3>

        <section className="dm-invites group">

          <section className="box-and-button group">
            <section
              className="dm-filters group"
              onClick={ this._goToInput }>
              { invitedUsers() }
              <input
                type="text"
                className="dm-invite-filter group"
                onChange={ this._updateFilter }
                ref="filterInput"
                placeholder={ placeHolder() }
                onKeyDown={ this._deleteInvite }
                value={ this.state.filter}
              />
            </section>

            <button className="dm-go"
              onClick={ this._handleSubmit }
              disabled={ disabled }>
              Go
            </button>

          </section>

          <p className="member-limit">{ memberLimit() }</p>

          <div className="list-top">
            { usersIndex() }
          </div>

        </section>
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
      const member = this.props.users.filter((member) =>
        member.username === e.currentTarget.childNodes[1].innerHTML);
      const newMembers = _.union(this.state.members, member);
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
        return (this.state.members.indexOf(user) === -1 &&
        user.username !== this.props.currentUser.username);
      });
    } else {
      return this.props.users.filter((user) => {
        if (user.name) {
          return (user.username.toLowerCase().indexOf(this.state.filter) > -1 ||
          user.name.toLowerCase().indexOf(this.state.filter) > -1) &&
          this.state.members.indexOf(user) === -1 &&
          user.username !== currentUser.username;
        } else {
          return (user.username.toLowerCase().indexOf(this.state.filter) > -1 &&
          this.state.members.indexOf(user) === -1 &&
          user.username !== currentUser.username);
        }
      });
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    let newChannel = _.merge({}, this.state);

    const memberNames = this.state.members.map((mem) => mem.username);
    newChannel.members = ([this.props.currentUser.username].concat(memberNames));
    newChannel.name = newChannel.members.sort().join(',');

    if (this._allDMNames().indexOf(newChannel.name) > -1){
      this._afterSubmit(newChannel.name);
    } else {
      this.props.createChannel(newChannel).then(() => this._afterSubmit(newChannel.name));
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

  _afterSubmit(dmName) {
    this.props.closeModal();
    const otherMembers = this.state.members.sort().join(',');
    this.props.router.replace(`messages/@${otherMembers}`);
  }
}

export default withRouter(DMForm);
