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
        <aside className="user-profile">
          Welcome, { currentUser.username }
          <br /><button onClick={ this.logOutUser }>
            Log Out
          </button>
        </aside>
      );
    } 
  }

  logOutUser(e) {
    e.preventDefault();
    this.props.logout();
  }
}

export default Profile;
