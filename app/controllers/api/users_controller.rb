class Api::UsersController < ApplicationController

  def create
    @user = User.new(user_params)

    if @user.save
      sign_in(@user)
      @user.add_default_channels
      render :show
    else
      render json:
        @user.errors.full_messages,
        status: 422
    end
  end

  def index
    @users = User.all
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email, :firstname, :lastname)
  end
end
