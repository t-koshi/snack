import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.logOutUser = this.logOutUser.bind(this);
  }

  render() {
    const { currentUser } = this.props;

    const joinedChannels = () => {
      if (currentUser.joined_channels) {
        return currentUser.joined_channels.map((channel) =>
        <li><strong>: :</strong>
          { channel.name }
        </li>);
      }
    };

    return (
      <aside className="user-profile group">
        <section className="user ">
          <h5>{ currentUser.username }</h5>
          <button onClick={ this.logOutUser }>
            Log Out
          </button>
          <p> v </p>
        </section>

        <section className="joined_channels">
          <h4>CHANNELS ( { joinedChannels().length } )</h4>
          <ul>
            { joinedChannels() }
          </ul>
        </section>

        <section className="dms">
          <h4>DIRECT MESSAGES( )</h4>
          <li>filler</li>
        </section>

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
