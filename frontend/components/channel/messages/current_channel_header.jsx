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

    const thirdItem = () => {
      if (this.props.router.params.channelName[0] === '@' &&
        this.props.currentChannel.members.length > 2){
        return '';
      } else if (this.props.router.params.channelName[0] === '@' &&
        this.props.currentChannel.members.length < 3) {
        const otherPerson = this.props.currentChannel.members.filter((member) =>
        member.username !== this.props.currentUser.username);
        return otherPerson.name;
      } else {
        return (
          <i className="fa fa-thumb-tack"
            id="channel-header-pin"
            aria-hidden="true"></i>
        );
      }
    };

    return (
      <section className="current-channel-header">
        <h4>{ headerName() }</h4>
        <ul className="info group">
          <li><i className="material-icons">star_border</i></li>
          <li>
            <i className="material-icons">person_outline</i>
            <span>{ this.props.currentChannel.members.length }</span>
          </li>
          <li>{ thirdItem() }</li>
        </ul>
      </section>
    );
  }
}


export default withRouter(CurrentChannelHeader);
