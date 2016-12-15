export const fetchMessages = (channelName) => {
  return $.ajax({
    method: "GET",
    url: `api/messages`,
    data: { channelName }
  });
};
