import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';

class CurrentChannelHeader extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // if the channel needs to be rendered like a dm, name will have commas,
    // remove currentUser and add spaces
    // if there are no commas, render channel name

    const headerName = () => {
      const { currentUser, currentChannel } = this.props;
      const DMName = currentChannel.name.split(',');

      if (currentChannel.name === currentUser.username ||
      currentChannel.name.indexOf(',') === -1) {
        return currentChannel.name;
      } else {
        DMName.splice(DMName.indexOf(currentUser.username), 1);
        return DMName.join(', ');
      }
    };

    if (this.props.fetching) return null;
    return (
      <section className="current-channel-header">
        <h4>{ headerName() }</h4>
        <ul className="group">
          <li><i className="material-icons">star_border</i></li>
          <li>
            <i className="material-icons">person_outline</i>
            <span>{ this.props.currentChannel.members.length }</span>
          </li>
          <li><i className="fa fa-thumb-tack" aria-hidden="true"></i></li>
        </ul>
      </section>
    );
  }
}


export default (CurrentChannelHeader);
