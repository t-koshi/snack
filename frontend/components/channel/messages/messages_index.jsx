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
    if (this.props.fetching) return null;

    const { currentChannel, currentUser, messages } = this.props;
    const msgs = this.props.messages.filter((msg) => msg.channel.id === currentChannel.id);
    const name = () => {
      if (currentUser.name) return currentUser.name;
    };

    const aChannel = () => {
      if (currentChannel.name.indexOf(',') === -1 &&
      currentChannel.name !== currentUser.username &&
      currentChannel.name !== 'general' &&
      currentChannel.name !== 'random') {
        return (
          <section className="a-channel group">
            <div className="group">
              <h1>{` :: ${currentChannel.name}`}</h1>
            </div>
          </section>
        );
      }
    };

    const personalPage = () => {
      if (currentChannel.name === currentUser.username ) {
        return (
          <section className="personal-page group">
            <div className="group">
              <img
                className="icon3"
                src={ currentUser.img_url }/>
              <ul className="group">
                <li>{`${name()}  @${currentUser.username}` }</li>
              </ul>
            </div>
            <p className="group">
              <strong>{ "This is your space. " }</strong>
              { "Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you'll have to supply both sides of the conversation." }
            </p>
          </section>
        );
      }
    };

    const snackbearPage = () => {
      if (this.props.router.params.channelName === '@snackbear' &&
      !this.props.fetching) {
        const snackbear = currentChannel.members.filter((member) =>
          member.username === "snackbear");

        return (
          <section className="snackbear-page">
            <h1>{ "Hi, Snackbear here!"}</h1>

          <div className="group">
            {snackbear.map((snackbear, idx) => {
              return <img className="icon4" key={ idx }
                src={ snackbear.img_url }/>;
            })}

            <p>
              { "You can ask me simple questions about what snacks I like. For example: 'do you like gummy bears?' Or simply: 'gummy bears'. I'm only a bear, but I'll do my best to answer! If I don't understand, I'll search the help center" }
            </p>
            </div>
          </section>
        );
      }
    };

    const dmPage = () => {
      if (this.props.router.params.channelName.indexOf('@') > -1  &&
        this.props.router.params.channelName !== '@snackbear' &&
      this.props.router.params.channelName !== `@${this.props.currentUser.username}`) {
        const otherMembers = this.props.currentChannel.members.filter((member) => {
          return member.username !== this.props.currentUser.username;
        });

        const otherMembersNames = this.props.router.params.channelName.replace('@', '').split(',');
        const lastMember = otherMembersNames.pop();

        if (!otherMembersNames.length) {
          return (
            <section className="dm-page">
              { otherMembers.map((member, idx) =>
                <img className="icon3 dm-page" src={ member.img_url } key={ idx }/>
              )}
              <p>
                <span>{ "This is the very beginning of your direct message history with "}</span>
                <strong>{ lastMember }</strong>
              </p>
            </section>
          );
        } else {
          return (
            <section className="dm-page">
              { otherMembers.map((member, idx) =>
                <img className="icon3 dm-page" src={ member.img_url } key={ idx }/>
              )}
              <p>
                <span>{ "This is the very beginning of your direct message history with " }</span>
                { otherMembersNames.map((name, idx) =>
                  <strong key={ idx }>{ `${name}, ` }</strong>
                )}
                <span>{"and "}</span>
                <strong>{ lastMember }</strong>
              </p>
            </section>
          );
        }
      }
    };

    const manyMessages = () => {
        let author_name = '';
        return msgs.map((message, idx) => {
          if (message.author.username === author_name) {
            return (
              <ul className="message group"
                key={ idx }>
                <div className="single-line">
                  <li>{ message.body }</li>
                </div>
              </ul>
            );
          } else {
            author_name = message.author.username;
            return (
              <ul className="message group"
                key={ idx }>
                <img className="icon2"
                  src={ message.author.img_url }></img>
                <div>
                  <h4>{ message.author.username }<span>{ message.time_str }</span></h4>
                  <li>{ message.body }</li>
                </div>
              </ul>
            );
          }
       });
   };

    return (
      <section className="messages group">
        { aChannel() }
        { personalPage() }
        { snackbearPage() }
        { dmPage() }

        <section className="messages-index group">
        { manyMessages() }
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
    fetching: state.fetching
  };
});

export default withRouter(connect(
  mapStateToProps
)(MessagesIndex));
