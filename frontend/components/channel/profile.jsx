import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import Modal from 'react-modal';
import Spinner from '../spinner';
import ChannelIndex from './channel_index';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      modalOpen: false,
      whichModal: ''
    });

    this.logOutUser = this.logOutUser.bind(this);
    this.handleClick = this._handleClick.bind(this);
    this.onModalClose = this._onModalClose.bind(this);
  }

  componentDidMount() {
    this.props.fetchChannels();
  }


  render() {
    if (this.props.fetching) return <Spinner />;

    const { currentUser } = this.props;

    const joinedChannels = () => {
      if (currentUser.joined_channels) {
        return currentUser.joined_channels.map((channel) =>
        <li key={ channel.id }><i>: :</i>
          { channel.name }
        </li>);
      }
    };

    return (
      <aside className="user-profile group">
        <section className="user ">
          <h5>{ currentUser.username }</h5>
          <button className="log-out" onClick={ this.logOutUser }>
            Log Out
          </button>
          <button className="acct-settings"> v </button>
        </section>

        <section>
          <li className="channel-header group">
            <h4 className="channel-type" onClick={ this.handleClick }>
              CHANNELS ( { this.props.channels.length } )
            </h4>
            <button className="new-channel">+</button>
          </li>
          <ul className="channels">
            { joinedChannels() }
          </ul>
        </section>

        <section>
          <li className="channel-header group">
            <h4 className="channel-type" onClick={ this.handleClick }>DIRECT MESSAGES( )</h4>
            <button className="new-channel">+</button>
          </li>
          <li>filler</li>
        </section>

        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.onModalClose }
          contentLabel="Modal"
          className="channel-index-modal"
          overlayClassName="channel-index-overlay"
        >

          <button className="close-modal group" onClick={ this.onModalClose }>
            <i>x</i><span>esc</span>
          </button>

          <h3> Browse all { this.props.channels.length } channels</h3>
          <ChannelIndex channels={ this.props.channels }/>
        </Modal>
      </aside>
    );
  }

  _handleClick() {
    this.setState({ modalOpen: true});
  }

  _onModalClose() {
    this.setState({ modalOpen: false});
  }

  logOutUser(e) {
    e.preventDefault();
    this.props.logout();
    this.props.router.replace('/');
  }
}

export default withRouter(Profile);
