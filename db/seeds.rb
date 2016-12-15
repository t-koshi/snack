

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create!([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create!(name: 'Luke', movie: movies.first)

ChannelMembership.destroy_all

User.destroy_all

users = User.create!([
  {username: 'snackbear',
  email: 'snackbear1@gmail.com',
  password: 'snackbear'},

  {username: 'guest',
  email: 'yumsnacks7@gmail.com',
  password: 'snacks123'},

  {username: 'chipmunk',
  email: 'chipmunk@chipmunk.com',
  password: 'chipmunk',
  firstname: 'Jahmaal',
  lastname: 'Fyffe'},

  {username: 'cakeboi',
  email: 'cakeboi@cakeboi.com',
  password: 'cakeboi',
  firstname: 'jon',
  lastname: 'dough'},

  {username: 'bethany',
  email: 'bethany@bethany.com',
  password: 'bethany'},

  {username: 'slimjimfan93',
  email: 'slimjimfan93@slimjimfan93.com',
  password: 'slimjimfan93',
  firstname: 'OD',
  lastname: 'Escobar'},

  {username: 'katsu_kat',
  email: 'katsu_kat@katsu_kat.com',
  password: 'katsu_kat',
  firstname: 'katsu',
  lastname: 'curry'},

  {username: 'hot_cheetos_farmer',
  email: 'hot_cheetos_farmer@hot_cheetos_farmer.com',
  password: 'hot_cheetos_farmer'},

  {username: 'jinjin123',
  email: 'alex.seoh@bronxscience.com',
  password: 'jinjin123',
  firstname: 'alex'},

  {username: 'bobachan',
  email: 'bobachan@maruchan.com',
  password: 'bobachan',
  firstname: 'kaila',
  lastname: 'chan'}
])

Channel.destroy_all

general = Channel.create!(
  name: 'general',
  purpose: 'This channel is for snackpack-wide communication and announcements. All snackpack members are in this channel.',
  creator: users.first,
  private: false
)

random = Channel.create!(
  name: 'random',
  purpose: "A place for vegetables, grains, seeds, or serious work you'd prefer to keep out of more focused snack-related channels.",
  creator: users.first,
  private: false
)

users.each do |user|
  ChannelMembership.create!(user: user, channel: general)
  ChannelMembership.create!(user: user, channel: random)
end

Message.destroy_all

users.drop(1).each do |user|
  snackbear = user.joined_channels.create!(
    name: [user.username, 'snackbear'].sort.join(','),
    creator: user,
    private: true
  )

  snackbear.messages.create!(
    body: "Hello, I'm Snackbear. I try to be helpful. (But I'm just a bear. Sorry!) Type something to get started. If you have any questions about how to use Snack, please ask me! I'll do my best to help.",
    author: users.first,
    channel: snackbear,
    edited: false
  )

  user.joined_channels.create!(
    name: user.username,
    creator: user,
    private: true
  )

  ChannelMembership.create!(user: users.first, channel: snackbear)
end
