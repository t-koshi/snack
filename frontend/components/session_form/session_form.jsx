import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import { merge } from 'lodash';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirect = this.redirect.bind(this);
    this.enterUsername = this.enterUsername.bind(this);
    this.enterPassword = this.enterPassword.bind(this);
  }

  render() {
    const otherLink = () => {
      return (this.props.formType === "signup") ? "login" : "signup";
    };

    const formErrors = (() => {
      if (this.props.errors) {
        return this.props.errors.map((error, idx) => {
          return <li className="error" key={ idx }>{ error }</li>;
        });
      }
    });

    return (
      <article>
        <ul>
          { formErrors() }
        </ul>

        <form className="bb-form" onSubmit={ this.handleSubmit }>
          <label>username:
            <input onChange={ this.enterUsername }
              className="input"
              type="text"
              value={ this.state.username }
              placeholder="username"/>
          </label><br />
          <label>password:
            <input onChange={ this.enterPassword }
              className="input"
              type="password"
              placeholder="min 6 chars"/>
          </label><br />
          <button className="create-button">{ this.props.formType }</button>
        </form><br />

        <Link to={ `/${otherLink()}` }>{ otherLink() }</Link>
      </article>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = merge({}, this.state);
    this.props.processForm(user).then(() => this.redirect());
  }

  enterUsername(e){
    e.preventDefault();
    this.setState({ username: e.target.value });
  }

  enterPassword(e){
    e.preventDefault();
    this.setState({ password: e.target.value });
  }

  changePassword(e){
    e.preventDefault();

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
