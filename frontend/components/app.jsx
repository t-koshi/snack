import React from 'react';
import ProfileContainer from './profile/profile_container';
import SessionFormContainer from './session_form/session_form_container';
import { Link, withRouter, Redirect } from 'react-router';
import { receiveErrors } from '../actions/session_actions';
import { receiveCurrentUser } from '../actions/session_actions';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickLogIn = this._handleClickLogIn.bind(this);
    this.handleClickSignUp = this._handleClickSignUp.bind(this);
    this.handleClickRoot = this._handleClickRoot.bind(this);
    this.guestSignIn = this._guestSignIn.bind(this);
  }

  render() {
    return (
      <div>
        <header>
          <h1><Link onClick={ this.handleClickRoot}>snack</Link></h1>
          <Link onClick={ this.handleClickLogIn }>Sign in</Link>
          <Link onClick={ this.handleClickSignUp }>Sign up</Link>
          <Link onClick={ this.guestSignIn }>Guest sign in</Link>
        </header>

        <ProfileContainer />
        { this.props.children }
      </div>
    );
  }

  _handleClickLogIn(e) {
    e.preventDefault();
    store.dispatch(receiveErrors(null));
    this.props.router.replace('/login');
  }

  _handleClickSignUp(e) {
    e.preventDefault();
    store.dispatch(receiveErrors(null));
    this.props.router.replace('/signup');
  }

  _handleClickRoot(e) {
    e.preventDefault();
    this.props.router.replace('/');
  }

  _guestSignIn(e) {
    e.preventDefault();
    store.dispatch(receiveCurrentUser({
      email: "talkaboutsnacks@gmail.com",
      password: "password"})
    );
  }
}

export default withRouter(App);
