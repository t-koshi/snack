# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
users = User.create([
  {
    username: 'guest',
    email: 'yumsnacks7@gmail.com',
    password: 'snacks123'
  }, {
    username: 'snackbear',
    email: 'snackbear1@gmail.com',
    password: 'snackbear'
  }
])

Channel.destroy_all
channels = Channel.create([
  {
    name: 'general',
    purpose: 'This channel is for snackpack-wide communication and announcements. All snackpack members are in this channel.',
    creator: User.find_by(username: 'snackbear')
  },
  {
    name: 'random',
    purpose: "A place for vegetables, grains, seeds, or serious work you'd prefer to keep out of more focused snack-related channels.",
    creator: User.find_by(username: 'snackbear')
  }
])
