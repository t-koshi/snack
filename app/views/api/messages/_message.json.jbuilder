json.extract! message, :id, :body, :edited, :time_str

json.set! :author do
  json.partial! 'api/users/user.json.jbuilder', user: message.author
end

json.set! :channel do
  json.partial! 'api/channels/channel.json.jbuilder', channel: message.channel
end
