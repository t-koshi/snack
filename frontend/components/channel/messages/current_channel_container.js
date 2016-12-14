import { connect } from 'react-redux';
import CurrentChannel from './current_channel';
import { withRouter } from 'react-router';
import { fetchCurrentChannel } from '../../../actions/messages_actions';

const mapStateToProps = ((state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    currentChannel: state.currentChannel.currentChannel,
    fetching: state.fetching,
  };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchCurrentChannel: (channelName) => dispatch(fetchCurrentChannel(channelName))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentChannel));
