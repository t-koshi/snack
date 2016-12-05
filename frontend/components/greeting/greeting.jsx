import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class Greeting extends React.Component {
  constructor(props) {
    super(props);

    this.logOutUser = this.logOutUser.bind(this);
  }

  render() {
    // debugger
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <article>
          Welcome, { `${currentUser.username}` }
          <br /><button onClick={ this.logOutUser }>
            Log Out
          </button>
        </article>
      );
    } else {
      return (
        <article>
          <Link to="/#/signup"></Link>
          <Link to="/#/login"></Link>
        </article>
      );
    }
  }

  logOutUser(e) {
    e.preventDefault();
    this.props.logout();
  }
}

export default Greeting;
