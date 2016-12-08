import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { withRouter } from 'react-router';
import ProfileContainer from './profile_container';


class ChannelIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <content>
        <ProfileContainer />
      { this.props.children };
      </content>
    )
  }
}

export default withRouter(ChannelIndex);
