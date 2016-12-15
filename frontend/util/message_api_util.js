export const fetchMessages = (channelName) => {
  return $.ajax({
    method: "GET",
    url: `api/messages`,
    data: { channel_name: channelName }
  });
};
//
// export const sendMessage = (message, channel) => {
//   return $.ajax({
//     method: "POST",
//     url: `api/messages`,
//     data: { message, channel }
//   });
// };

export const sendMessage = (message, channel) => {
  return $.ajax({
    method: "POST",
    url: `api/messages`,
    data: { message: message, channel_name: channel.name }
  });
};
