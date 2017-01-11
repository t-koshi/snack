class UserMailer < ApplicationMailer
  default from: 'snackbear@snack.com'

  def welcome_email(user)
    @user = user
    @url = 'http://www.eat-snack.com/login'
    mail(to: user.email, subject: 'Welcome to Snack')
  end
end
