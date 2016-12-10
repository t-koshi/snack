import { values } from 'lodash';

export function allChannels({ channels }) {
  return _.values(channels.channels);
}
