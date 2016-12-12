json.partial! 'api/users/user', user: @user
json.joined_channels @user.joined_channels do |channel|
  json.partial! 'api/channels/channel', channel: channel
end
