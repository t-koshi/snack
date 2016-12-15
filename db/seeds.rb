

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
  password: 'snackbear',
  img_url: 'snackbear2.gif'},

  {username: 'guest',
  email: 'yumsnacks7@gmail.com',
  password: 'snacks123',
  img_url: 'guest.png'},

  {username: 'chipmunk',
  email: 'chipmunk@chipmunk.com',
  password: 'chipmunk',
  firstname: 'Jahmaal',
  lastname: 'Fyffe',
  img_url: 'a1.gif'},

  {username: 'cakeboi',
  email: 'cakeboi@cakeboi.com',
  password: 'cakeboi',
  firstname: 'jon',
  lastname: 'dough',
  img_url: 'a2.png'},

  {username: 'bethany',
  email: 'bethany@bethany.com',
  password: 'bethany',
  img_url: 'a3.png'},

  {username: 'katsu_kat',
  email: 'katsu_kat@katsu_kat.com',
  password: 'katsu_kat',
  firstname: 'katherine',
  lastname: 'curry',
  img_url: 'a4.gif'},

  {username: 'slimjimfan93',
  email: 'slimjimfan93@slimjimfan93.com',
  password: 'slimjimfan93',
  firstname: 'OD',
  lastname: 'Escobar',
  img_url: 'a5.gif'},

  {username: 'hot_cheetos_farmer',
  email: 'hot_cheetos_farmer@hot_cheetos_farmer.com',
  password: 'hot_cheetos_farmer',
  img_url: 'a6.png'},

  {username: 'jinjin123',
  email: 'alex.seoh@bronxscience.com',
  password: 'jinjin123',
  firstname: 'alex',
  img_url: 'a7.jpg'},

  {username: 'bobachan',
  email: 'bobachan@maruchan.com',
  password: 'bobachan',
  firstname: 'kaila',
  lastname: 'chan',
  img_url: 'a8.gif'},

  {username: 'wild_salmon',
  email: 'salmon@salmon.com',
  password: 'salmon',
  firstname: 'zachary',
  lastname: 'salmon',
  img_url: 'a9.png'},

  {username: 'bread',
  email: 'onyinye@oyinye.com',
  password: 'onyinye',
  firstname: 'oyinye',
  img_url: 'a10.png'},

  {username: 'wetfoodlover',
  email: 'neil@neil.com',
  password: 'neilcat',
  firstname: 'neil',
  lastname: 'cat',
  img_url: 'a11.png'},

  {username: 'chocolate_whale',
  email: 'chocolate@chocolate.com',
  password: 'chocolate',
  firstname: 'chocolate',
  lastname: 'whale',
  img_url: 'a12.png'},

  {username: 'hmmmmm_iamheek',
  email: 'heek@heek.com',
  password: 'heekcat',
  firstname: 'heek',
  lastname: 'cat',
  img_url: 'a13.png'}
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
