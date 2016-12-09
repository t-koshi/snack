import React from 'react';

const ChannelIndex = (({channels}) => {
  return (
    <ul>
      { channels.map((channel) => {
        return (
          <li key={ channel.id }>
            <h4>{ channel.name }</h4>
            <p>Created by { channel.creator.username } on { channel.stringified_date }</p>
          </li>
        );
      })}
    </ul>
  );
});

export default ChannelIndex;
