import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import { merge } from 'lodash';
import HeaderContainer from './header_container';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  render() {
    const { username, email, password } = this.state;

    const formErrors = (() => {
      if (this.props.errors){
        return (
          <ul className="session-errors">
          { this.props.errors.map((error, idx) => (
            <li key={ idx }>{ error }</li>)
          )}
          </ul>
        );
      }
    });

    const usernameField = (() => {
      if (this.props.formType === "Sign up") {
        return (
          <input onChange={ this.enterField("username") }
            type="text"
            value={ username }
            placeholder="username"/>
        );
      }
    });

    const emailText = (() => {
      if (this.props.formType === "Sign up") {
        return <strong>email address, username, </strong>;
      } else {
        return <strong>email address&nbsp;</strong>;
      }
    });

    let disabled = this.props.fetching ? true : false;

    return (
      <section className="session">
        <HeaderContainer page={ 'session' }/>

        { formErrors() }
        <form className="session-form" onSubmit={ this.handleSubmit }>
          <h2>Sign in to snack.com</h2>
          <p>Enter your { emailText() }and <strong>password.</strong></p>
            <input onChange={ this.enterField("email") }
              type="text"
              value={ email }
              placeholder="you@domain.com"/>
          { usernameField() }
            <input onChange={ this.enterField("password") }
              type="password"
              placeholder="password"/>
            <button disabled={ disabled }>{ this.props.formType }</button>
        </form><br />

      </section>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.processForm(user).then(() => this.redirect());
  }

  enterField(field){
    return (e) => this.setState({
      [field]: e.target.value
    });
  }

  redirect() {
    if (this.props.loggedIn) {
      this.props.router.replace('/messages');
    } else {
      this.props.router.replace(`${this.props.router.location.pathname}`);
    }
  }
}

export default withRouter(SessionForm);
