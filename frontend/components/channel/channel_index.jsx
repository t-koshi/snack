import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link, withRouter } from 'react-router';

class ChannelIndex extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ''
    };

    this.setFilter = this._setFilter.bind(this);
  }

  render() {
    return (
      <section className="channel-index-modal group">

        <section className="apply-filters group">
          <h3> Browse all { this.props.channels.length } channels</h3>
          <input onChange={ this.setFilter } type="text" placeholder="Search channels"></input>
          <select>
            <option value="memM">{ "Sort by Members (most to fewest)" }</option>
          </select>
        </section>

        <ul className="channels-index group">
          { this._channelsToRender().map((channel, idx) => {
            return (
              <li className="group" key={ idx }>
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
}

export default withRouter(ChannelIndex);
