import React from 'react';
import Modal from 'react-modal';

const ChannelIndex = (({channels}) => {
  return (
    <ul className="channels-index group">
      { channels.map((channel) => {
        return (
          <li className="group" key={ channel.id }>
            <h4>{ channel.name }</h4>
            <p>Created by { channel.creator.username } on { channel.stringified_date }</p>
            <i>{ channel.members.length }</i>
          </li>
        );
      })}
    </ul>
  );
});

export default ChannelIndex;
