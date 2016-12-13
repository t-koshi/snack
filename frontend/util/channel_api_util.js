export const createChannel = (channel) => {
  return $.ajax({
    method: "POST",
    url: "api/channels",
    data: { channel }
  });
};

export const fetchChannels = () => {
  return $.ajax({
    method: "GET",
    url: "api/channels",
  });
};

export const joinChannel = (({channel}) => {
  return $.ajax({
    method: "POST",
    url: `api/channels/${channel.name}`,
    data: channel
  });
});

export const fetchCurrentChannel = (channelName) => {
  return $.ajax({
    method: "GET",
    url: `api/channels/${channelName}`
  });
};
