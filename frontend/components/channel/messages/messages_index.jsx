import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { allMessages } from '../../../reducers/selector';

class MessagesIndex extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.currentChannel.name === this.props.currentUser.name ) {
      return (
        <p>
          <strong>{ "This is your space." }</strong>
          { "Draft messages, list your to-dos, or keep links and files handy. You can also talk to yourself here, but please bear in mind you'll have to supply both sides of the conversation." }
        </p>
      );
    } else{
      return (
        <section>
          {
            this.props.messages.map((message) => {
              return (
                <div>
                <img>.
                </img>
                <ul>
                  <h4>
                    { message.author.username }
                    { message.body}
                  </h4>
                </ul>
                </div>
              );
            })
          }
        </section>
      );
    }
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
