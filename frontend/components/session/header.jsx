import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleClickLogIn = this._handleClickLogIn.bind(this);
    this.handleClickSignUp = this._handleClickSignUp.bind(this);
    this.guestSignIn = this._guestSignIn.bind(this);
    this.handleClickHome = this._handleClickHome.bind(this);
  }

  render() {
    const headerPage = (() => {
      if (this.props.page === "/") {
        return "root-header";
      } else {
        return "session-header";
      }
    });

    const logoPage = (() => {
      if (this.props.page === "/") {
        return window.rootAssets.rootLogo;
      } else {
        return window.rootAssets.sessionLogo;
      }
    });

    return (
      <header className={ `${headerPage()} group` }>
        <img className="logo" src={ logoPage() } onClick={ this.handleClickHome} />
        <Link onClick={ this.handleClickLogIn }>Sign in</Link>
        <Link onClick={ this.handleClickSignUp }>Sign up</Link>
        <Link onClick={ this.guestSignIn }>Guest sign in</Link>
      </header>
    );
  }


  _handleClickHome(e) {
    e.preventDefault();
    this.props.router.replace('/');
  }

  _handleClickLogIn(e) {
    e.preventDefault();
    this.props.resetErrors();
    if (this.props.currentUser) {
      this.props.router.replace('/messages');
    } else {
      this.props.router.replace('/login');
    }
  }

  _handleClickSignUp(e) {
    e.preventDefault();
    this.props.resetErrors();
    this.props.router.replace('/signup');
  }

  _guestSignIn(e) {
    e.preventDefault();
    if ( this.props.currentUser === null ) {
      this.props.login({
        email: "yumsnacks7@gmail.com",
        password: "snacks123"
      }).then(() => this.props.router.push('/messages'), (err) => console.log(err));
    } else {
      this.props.router.replace('/messages');
    }
  }
}

export default withRouter(Header);
