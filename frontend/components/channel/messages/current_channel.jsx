import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router';
import CurrentChannelHeader from './current_channel_header';
import MessagesIndexContainer from './messages_index';
import * as Util from '../../../util/util';

class CurrentChannel extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      message_body: ''
    });

    this._joinChannel = this._joinChannel.bind(this);
  }

  componentDidMount() {
    let { channelName } = this.props.router.params;
    const { currentChannel } = this.props;
    const fetchChannelName = Util.DmUrlToName(channelName, this.props.currentUser);
    this.props.fetchMessages(fetchChannelName);

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
    const { currentUser, currentChannel } = this.props;
    const bottom = () => {
      if (Util.isInChannel(currentUser, currentChannel)) {
        return (
          <section className="bottom">
            <div className="group">
              <i className="file-sending">
                { "+" }
              </i>
              <textarea
                className="msg-box"
                placeholder={ `Message ${this.props.currentChannel.name.replace(/,/g, ', ')}` }>
              </textarea>
            </div>
          </section>
        );
      } else {
        return (
          <section className="bottom">
            <span>{"You are viewing a preview of #music"}</span>
            <button className="join-channel"
              onClick={ this._joinChannel }>
              Join Channel
            </button>
          </section>
        );
      }
    };


    return (
      <section className="current-channel">
        <CurrentChannelHeader
          currentChannel={ this.props.currentChannel }
          currentChannelName={ this.props.currentChannelName }
          currentUser={ this.props.currentUser }
        />
        <MessagesIndexContainer/>
        { bottom() }
      </section>
    );
  }

  _joinChannel(e) {
    e.preventDefault();
    this.props.joinChannel(this.props.currentChannel);
  }
}

export default withRouter(CurrentChannel);
