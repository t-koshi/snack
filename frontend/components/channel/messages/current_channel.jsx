import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import CurrentChannelHeader from './current_channel_header';
import MessagesIndexContainer from './messages_index';

class CurrentChannel extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      message_body: ''
    });
  }

  componentDidMount() {

    let { channelName } = this.props.router.params;
    if (channelName[0] === '@') {
      channelName = channelName.slice(1);
    }

    const { currentChannel } = this.props;
    //Pusher subscribe
    const pusher = new Pusher('a4ceeff403545c1bfce2', {
      encrypted: true
    });

    const channel = pusher.subscribe(currentChannel.name);
    channel.bind('message_sent', function(data) {
      alert(data.message);
      this.props.fetchMessages();
    });
    //
  }

  render() {
    return (
      <section className="current-channel">
        <CurrentChannelHeader
          currentChannel={ this.props.currentChannel }
          currentChannelName={ this.props.currentChannelName }
          currentUser={ this.props.currentUser }
        />

        <MessagesIndexContainer />

        <textarea
          placeholder={ `Message ${this.props.currentChannel.name}` }>
        </textarea>
      </section>
    );
  }
}

export default withRouter(CurrentChannel);
