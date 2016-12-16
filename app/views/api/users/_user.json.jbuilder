json.extract! user, :id, :username, :name

json.img_url asset_path(user.avatar.url)
# json.partial! 'api/channels/channel', collection: user.joined_channels, as: :channel


# json.array! user.joined_channels do |channel|
#   json.partial! 'api/channels/channel', channel: channel
# end
#
