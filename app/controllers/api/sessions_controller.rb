class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if @user
      sign_in(@user)
      redirect_to "/"
    else
      render json:
        ['Sorry, you entered an incorrect email address or password.'],
        status: 401
    end
  end

  def destroy
    if current_user
      logout
      render json: {}
    else
      render json:
        ['no current user'],
        status: 404
    end
  end
end
