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
          <section className="personalPage-page">
            <div>
              <ul>
                <img src={ currentUser.img_url }/>
              </ul>
              <ul>
                <li>{ currentUser.name }</li>
                <li>{ `@${currentUser.username}` }</li>
              </ul>

            </div>
            <p>
              <strong>{ "This is your space." }</strong>
              { "Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you'll have to supply both sides of the conversation." }
            </p>
          </section>
        );
      }
    };

    const snackbearPage = () => {
      if (this.props.router.params.channelName === '@snackbear' ) {
        const snackbear = currentChannel.members.filter((member) =>
          member.username === "snackbear");
        return (
          <section>
          <p className="snackbear-page">
            <img/>
            <h1>{ "Hi, Snackbear here!"}</h1>
            { "You can ask me simple questions about what snacks I like. For example: 'do you like gummy bears?' Or simply: 'gummy bears'. I'm only a bear, but I'll do my best to answer! If I don't understand, I'll search the help center" }
          </p>
          </section>
        );
      }
    };


    return (
      <section className="messages group">
        { personalPage() }
        { snackbearPage() }
        <section className="messages-index group">
        { messages.map((message, idx) => {
          return (

            <ul className="message group"
              key={ idx }>
              <img className="icon2"
                src={ message.author.username.img_url }></img>
              <h4>{ message.author.username }</h4>
              <li>{ message.body }</li>
            </ul>
          );
        }) }
          <div id="message-bottom"></div>
        </section>
      </section>
    );
  }
}

const mapStateToProps = ((state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    currentChannel: state.currentChannel.currentChannel,
    messages: allMessages(state),
    users: state.users
  };
});

export default withRouter(connect(
  mapStateToProps
)(MessagesIndex));
