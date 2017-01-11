json.extract! user, :id, :username, :name, :firstname, :lastname

json.img_url asset_path(user.avatar.url)

json.joined_channels user.joined_channels do |channel|
  json.partial! 'api/channels/channel.json.jbuilder', channel: channel
end

json.messages user.messages do |message|
  json.partial! 'api/messages/message.json.jbuilder', message: message
end
