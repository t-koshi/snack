import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link, withRouter } from 'react-router';

class ChannelIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ''
    };

    this._etFilter = this._setFilter.bind(this);
    this._visitChannel = this._visitChannel.bind(this);
  }

  render() {
    return (
      <section className="channel-index-modal group">
        <section className="apply-filters group">
          <h3> Browse all { this.props.channels.length } channels</h3>
          <div className="new-wrapper">
            <button className="modal-new" onClick={ this.props.passToNew }>New Channel</button>
          </div>
          <div className="search group">
            <input onChange={ this._setFilter } type="text" placeholder="Search channels"></input>
          </div>

          <div className="sort group">
            <select>
              <option value="memM">{ "Sort by Members (most to fewest)" }</option>
            </select>
          </div>
        </section>

        <ul className="channels-index group">
          <span>Channels you can join</span>
          { this._channelsToRender().map((channel, idx) => {
            return (
              <li
                className="group"
                onClick={ this._visitChannel }
                key={ idx }>
                <h4>{ channel.name }</h4>
                <p>Created by { channel.creator.username } on { channel.stringified_date }</p>
                <i>{ channel.members.length }</i>
              </li>
            );
          })}
        </ul>

      </section>
    );
  }

  _channelsToRender() {
    const { channels } = this.props;

    return channels.filter((channel) => {
      return channel.name.toLowerCase().indexOf(this.state.filter) > -1;
    });
  }

  _setFilter(e) {
    e.preventDefault();
    this.setState({filter: e.currentTarget.value.toLowerCase()});
  }

  _visitChannel(e) {
    e.preventDefault();
    const channelName = e.currentTarget.children[0].innerHTML;
    this.props.fetchCurrentChannel(channelName).then(() => {
      this.props.closeModal();
      this.props.router.replace(`/messages/${channelName}`);
    });
  }
}

export default withRouter(ChannelIndex);
