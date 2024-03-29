json.extract! channel, :id, :name, :purpose, :stringified_date, :private

json.members channel.members do |member|
  json.partial! 'api/users/user.json.jbuilder', user: member
end


json.set! :creator do
  json.partial! 'api/users/user.json.jbuilder', user: channel.creator
end
