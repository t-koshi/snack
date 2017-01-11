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
      body: ''
    });

    this._joinChannel = this._joinChannel.bind(this);
    this._updateField = this._updateField.bind(this);
    this._sendMessage = this._sendMessage.bind(this);
  }

  componentDidMount() {
    let { channelName } = this.props.router.params;
    const { currentChannel, fetchMessages, currentUser } = this.props;
    const fetchChannelName = Util.DmUrlToName(channelName, currentUser);
    // this.props.fetchMessages(fetchChannelName);

    //Pusher subscribe
    const pusher = new Pusher('a4ceeff403545c1bfce2', {
      encrypted: true
    });

    // const channel = pusher.subscribe(currentChannel.name);
    const that = this;
    const channel = pusher.subscribe('channel');
    channel.bind('message_sent', (data) => {
      return that.props.receiveMessage(data);
      }
    );
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
                placeholder={ `Message ${this.props.router.params.channelName.replace(/,/g, ', ').replace('@', '')}` }
                onKeyDown={ this._sendMessage }
                onChange={ this._updateField }
                value={ this.state.body }>
              </textarea>
            </div>
          </section>
        );
      } else {
        return (
          <section className="bottom">
            <span>{ `You are viewing a preview of ${this.props.currentChannel.name}` }</span>
            <button className="join-channel"
              onClick={ this._joinChannel }>
              Join Channel
            </button>
          </section>
        );
      }
    };

    return (
      <section className="current-channel group">
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

  _sendMessage(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.sendMessage(this.state, this.props.currentChannel);
      this.setState({ body: ''});
    }
  }

  _updateField(e) {
    e.preventDefault();
    this.setState({ body: e.target.value});
  }
}

export default withRouter(CurrentChannel);
