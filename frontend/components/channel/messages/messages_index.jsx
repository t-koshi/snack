import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { allMessages } from '../../../reducers/selector';

class MessagesIndex extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this._scrollToBottom();
  }

  _scrollToBottom() {
    const msgBottom = document.getElementById('message-bottom');
    if (msgBottom) {
      msgBottom.scrollIntoView();
    }
  }

  render() {
    const { currentChannel, currentUser, messages } = this.props;

    const personalPage = () => {
      if (currentChannel.name === currentUser.username ) {
        return (
          <p>
            <strong>{ "This is your space." }</strong>
            { "Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you'll have to supply both sides of the conversation." }
          </p>
        );
      }
    };

    const snackbearPage = () => {
      if (this.props.router.params.channelName === '@snackbear' ) {
        return (
          <p>
            <h1>{ "Hi, Snackbear here!"}</h1>
            { "You can ask me simple questions about what snacks I like. For example: 'do you like gummy bears?' Or simple: 'gummy bears'. I'm only a bear, but I'll do my best to answer! If I don't understand, I'll search the help center" }
          </p>
        );
      }
    };


    return (
      <section className="messages-index">
        { personalPage() }
        { messages.map((message, idx) => {
          return (
            <ul key={ idx }>
              <img></img>
              <h4>{ message.author.username }</h4>
              <li>{ message.body }</li>
            </ul>
          );
        }) }

        <div id="message-bottom"></div>
      </section>
    );
  }
}

const mapStateToProps = ((state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    currentChannel: state.currentChannel.currentChannel,
    messages: allMessages(state)
  };
});

export default withRouter(connect(
  mapStateToProps
)(MessagesIndex));
