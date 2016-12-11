import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import Modal from 'react-modal';
import Spinner from '../spinner';
import ChannelIndex from './channel_index';
import ChannelForm from './channel_form';
import DMForm from './dm_form';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      modalOpen: false,
      whichModal: ''
    });

    this.logOutUser = this.logOutUser.bind(this);
    this.handleClickIndex = this._handleClickIndex.bind(this);
    this.handleClickDM = this._handleClickDM.bind(this);
    this.handleClickNew = this._handleClickNew.bind(this);
    this.onModalClose = this._onModalClose.bind(this);
  }

  componentDidMount() {
    this.props.fetchChannels();
    this.props.fetchUsers();
  }


  render() {
    if (this.props.fetching) return <Spinner />;

    const { currentUser } = this.props;

    const joinedChannels = () => {
      if (currentUser.joined_channels) {
        return currentUser.joined_channels.map((channel) =>
        <li key={ channel.id }>
          { channel.name }
        </li>);
      }
    };

    const renderModal = () => {
      if (this.state.whichModal === 'index') {
        return <ChannelIndex channels={ this.props.channels }/>;
      } else if (this.state.whichModal === 'new') {
        return <ChannelForm
          users={ this.props.users }
          createChannel={ this.props.createChannel }
          currentUser={ currentUser }/>;
      } else if (this.state.whichModal === 'DM') {
        return <DMForm users={ this.props.users }/>;
      }
    };

    return (
      <aside className="user-profile group">
        <section className="user">
          <h5>{ currentUser.username }</h5>
          <button className="log-out" onClick={ this.logOutUser }>
            Log Out
          </button>
          <button className="acct-settings"> v </button>
        </section>

        <section>
          <li className="channel-header group">
            <h4 className="channel-type" onClick={ this.handleClickIndex }>
              CHANNELS ( { this.props.channels.length } )
            </h4>
            <button className="new-channel" onClick={ this.handleClickNew }>+</button>
          </li>
          <ul className="channels">
            { joinedChannels() }
          </ul>
        </section>

        <section>
          <li className="channel-header group">
            <h4 className="channel-type" onClick={ this.handleClickDM }>DIRECT MESSAGES( )</h4>
            <button className="new-channel">+</button>
          </li>
          <li>filler</li>
        </section>

        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.onModalClose }
          contentLabel="Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
        >

          <header className="close-modal group">
            <button onClick={ this.onModalClose }>
              <i>+</i>
              <span>esc</span>
            </button>
          </header>

          { renderModal() }
        </Modal>
      </aside>
    );
  }

  _handleClickDM() {
    this.setState({ modalOpen: true, whichModal: 'DM' });
  }

  _handleClickNew() {
    this.setState({ modalOpen: true, whichModal: 'new'});
  }

  _handleClickIndex() {
    this.setState({ modalOpen: true, whichModal: 'index'});
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
