import React from 'react';
import ProfileContainer from './channel/profile_container';
import SessionFormContainer from './session/session_form_container';
import { Link, withRouter, Redirect } from 'react-router';
import { resetErrors } from '../actions/session_actions';
import { login } from '../actions/session_actions';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <main className="App">
        { this.props.children }
      </main>
    );
  }
}

export default withRouter(App);
