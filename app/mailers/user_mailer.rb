class UserMailer < ApplicationMailer
  default from: 'snackbear@snack.com'

  def welcome_email(user)
    @user = user
    @url = 'http://snax.heroku/login'
    mail(to: user.email, subject: 'Welcome to Snack')
  end
end
