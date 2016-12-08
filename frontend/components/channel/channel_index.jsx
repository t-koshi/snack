import React, { Component } from 'react';
import Modal from 'react-modal';
import { withRouter } from 'react-router';
import ProfileContainer from './profile_container';
import Spinner from '../spinner';


class ChannelIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.fetching) return <Spinner />;

    return (
      <content>
        <ProfileContainer />
      </content>
    )
  }
}

export default withRouter(ChannelIndex);
