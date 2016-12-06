import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import { merge } from 'lodash';

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
    this.enterEmail= this.enterEmail.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
    this.enterPassword = this.enterPassword.bind(this);
  }

  render() {
    // const otherLink = () => {
    //   return (this.props.formType === "signup") ? "login" : "signup";
    // };

    const errors = (() => {
      if (this.props.errors.length !== 0){
          return this.props.errors.map((error, idx) => {
            return <li key={ idx }>{ error }</li>;
          });
        }
    });

    const formErrors = (() => {
      if (this.props.errors.length !== 0){
        return <ul className="session-errors">{ errors()} </ul>;
      }
    });

    const usernameField = (() => {
      if (this.props.formType === "Sign up") {
        return (
          <input onChange={ this.enterUsername }
            type="text"
            value={ this.state.username }
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

    return (
      <section className="session">

        { formErrors() }

        <form className="session-form" onSubmit={ this.handleSubmit }>
          <h2>Sign in to snack.com</h2>
          <p>Enter your { emailText() }and <strong>password.</strong></p>
            <input onChange={ this.enterEmail }
              type="email"
              value={ this.state.email }
              placeholder="you@domain.com"/>
          { usernameField() }
            <input onChange={ this.enterPassword }
              type="password"
              placeholder="password"/>
          <button>{ this.props.formType }</button>
        </form><br />

      </section>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.processForm(user).then(() => this.redirect());
  }

  enterEmail(e){
    e.preventDefault();
    this.setState({ email: e.target.value });
  }

  enterUsername(e){
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  enterPassword(e){
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  redirect() {
    if (this.props.loggedIn) {
      this.props.router.push(`/`);
    } else {
      this.props.router.push(`${this.props.router.location.pathname}`);
    }
  }
}

export default withRouter(SessionForm);
