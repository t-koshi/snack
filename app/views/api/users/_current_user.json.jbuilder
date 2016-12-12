json.extract! user, :username, :name
# json.partial! 'api/channels/channel', collection: user.joined_channels, as: :channel


json.joined_channels user.joined_channels do |channel|
  json.partial! 'api/channels/channel.json.jbuilder', channel: channel
end
