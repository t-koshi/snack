json.extract! user, :username, :name
# json.partial! 'api/channels/channel', collection: user.joined_channels, as: :channel


# json.array! user.joined_channels do |channel|
#   json.partial! 'api/channels/channel', channel: channel
# end
#
