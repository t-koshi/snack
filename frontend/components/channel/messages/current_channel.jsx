import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import CurrentChannelHeader from './current_channel_header';

class CurrentChannel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="messages-index">
        <CurrentChannelHeader
          currentChannel={ this.props.currentChannel }
          currentChannelName={ this.props.currentChannelName }
          currentUser={ this.props.currentUser }
          fetching={ this.props.fetching }/>
      </section>
    );
  }
}

export default withRouter(CurrentChannel);
