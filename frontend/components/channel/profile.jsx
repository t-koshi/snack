import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.logOutUser = this.logOutUser.bind(this);
  }

  componentDidMount() {
  }

  render() {
    const { currentUser } = this.props;

    return (
      <aside className="user-profile">
        Welcome, { currentUser.username }
        <br /><button onClick={ this.logOutUser }>
          Log Out
        </button>
      </aside>
    );
  }

  logOutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.router.replace('/');
  }
}

export default withRouter(Profile);
