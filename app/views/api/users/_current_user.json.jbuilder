json.extract! user, :id, :username, :name, :firstname, :lastname
# json.partial! 'api/channels/channel', collection: user.joined_channels, as: :channel

json.img_url asset_path(user.avatar.url)

json.joined_channels user.joined_channels do |channel|
  json.partial! 'api/channels/channel.json.jbuilder', channel: channel
end
