import { connect } from 'react-redux';
import CurrentChannel from './current_channel';
import { withRouter } from 'react-router';
import { fetchCurrentChannel, fetchMessages } from '../../../actions/messages_actions';
import { allChannels, allUsers, allMessages } from '../../../reducers/selector';

const mapStateToProps = ((state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    currentChannel: state.currentChannel.currentChannel,
    fetching: state.fetching,
    messages: allMessages(state)
  };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchCurrentChannel: (channelName) => dispatch(fetchCurrentChannel(channelName)),
    fetchMessages: (channelName) => dispatch(fetchMessages(channelName))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentChannel));
