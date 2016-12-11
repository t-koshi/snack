

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

ChannelMembership.destroy_all

User.destroy_all

users = User.create([
  {username: 'snackbear',
  email: 'snackbear1@gmail.com',
  password: 'snackbear'},

  {username: 'guest',
  email: 'yumsnacks7@gmail.com',
  password: 'snacks123'}
])

Channel.destroy_all

general = Channel.create(
  name: 'general',
  purpose: 'This channel is for snackpack-wide communication and announcements. All snackpack members are in this channel.',
  creator: users.first,
  private: false
)

random = Channel.create(
  name: 'random',
  purpose: "A place for vegetables, grains, seeds, or serious work you'd prefer to keep out of more focused snack-related channels.",
  creator: users.first,
  private: false
)

users.each do |user|
  ChannelMembership.create(user: user, channel: general)
  ChannelMembership.create(user: user, channel: random)
end
