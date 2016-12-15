export const DmNameToDisplay = (channelName, currentUser) => {
  //snackbear,guest
  //guest

  if (channelName === currentUser.username) {
    return channelName;
  } else {
    const allMembs = channelName.split(',');
    const idxUser = allMembs.indexOf(currentUser.username);
    allMembs.splice(idxUser, 1);
    return allMembs.join(', ');
  }
};

export const DmUrlToName = (url, currentUser) => {
  if (url === `@${currentUser.username}`) {
    return url.replace('@', '');
  } else if (url.includes('@')) {
    const display = url.replace('@', '');
    const noSpace = display.replace(/ /g,'');
    const allMembs = display.split(',');
    allMembs.push(currentUser.username);
    allMembs.sort();
    return allMembs.join(',');
  } else {
    return url;
  }
};

export const DmNameToUrl = (channelName, currentUser) => {
  if (channelName === currentUser.username) {
    return `@${channelName}`;
  } else {
    const allMembs = channelName.split(',');
    const displayMembs = allMembs.filter((member) =>
      member.username !== currentUser.username);
    const membString = displayMembs.join(',');
    return `@${membString}`;
  }
};

export const DmUrlToDisplay = (url, currentUser) => {
  if (url === `@${currentUser.username}`) {
    return currentUser.username;
  } else if (url.includes('@')) {
    return url.slice(1).replace(/,/g , ', ');
  } else {
    return url;
  }
};

export const isInChannel = (user, channel) => {
  const channelNames = user.joined_channels.map((channel) => channel.name);
  return channelNames.indexOf(channel.name) > -1;
};
