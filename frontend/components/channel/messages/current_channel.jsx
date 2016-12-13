import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import ChannelHeader from './channel_header';

class CurrentChannel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchCurrentChannel(this.props.currentChannelName);
  }

  render() {
    return (
      <section className="messages-index">
        <ChannelHeader
          currentChannel={ this.props.currentChannel }
          currentUser={ this.props.currentUser }/>
      </section>
    );
  }
}


export default withRouter(CurrentChannel);
