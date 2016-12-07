import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.logOutUser = this.logOutUser.bind(this);
  }

  render() {
    const { currentUser } = this.props;

    if (currentUser) {
      return (
        <article>
          Welcome, { this.props.currentUser.username }
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

export default Profile;
