import React from 'react';
import ProfileContainer from './profile/profile_container';
import SessionFormContainer from './session_form/session_form_container';
import { Link, withRouter, Redirect } from 'react-router';
import { resetErrors } from '../actions/session_actions';
import { login } from '../actions/session_actions';

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
        <header className="header-bar">
          <img className="logo" src={ window.rootAssets.logo } onClick={ this.handleClickRoot} />
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
    store.dispatch(resetErrors(null));
    this.props.router.replace('/login');
  }

  _handleClickSignUp(e) {
    e.preventDefault();
    store.dispatch(resetErrors(null));
    this.props.router.replace('/signup');
  }

  _handleClickRoot(e) {
    e.preventDefault();
    this.props.router.replace('/');
  }

  _guestSignIn(e) {
    e.preventDefault();
    if ( store.getState().session.currentUser === null ) {
      store.dispatch(login({
        email: "yumsnacks7@gmail.com",
        password: "snacks123"}));
    }
    this.props.router.replace('/');
  }
}

export default withRouter(App);
