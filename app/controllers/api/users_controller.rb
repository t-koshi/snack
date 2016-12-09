class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      @user.add_default_channels
      render 'api/users/show'
    else
      render json:
        ['unable to create new acct'].concat(@user.errors.full_messages),
        status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
