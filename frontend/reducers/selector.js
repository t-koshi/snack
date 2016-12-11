import { values } from 'lodash';

export function allChannels({ channels }) {
  return _.values(channels.channels);
}

export function allUsers({ users }) {
  return _.values(users);
}
