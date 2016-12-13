class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.where(private: false) + current_user.joined_channels.where(private: true)
  end

  def create
    @channel = Channel.new(
      name: params[:channel][:name],
      purpose: params[:channel][:purpose],
      private: params[:channel][:private]
    )

    @channel.creator = current_user
    debugger
    if @channel.save
      ChannelMembership.create(user: current_user, channel: @channel)
      members = User
        .where(username: params[:channel][:members])
        .where
        .not(username: current_user.username)
      @channel.members << members
      render :show
    else
      render json:
        ['Please fill in a channel name.'],
        status: 422
    end
  end

  def update
    @channel = Channel.find_by(name: params[:name])
    ChannelMembership.create(channel: @channel, user: currentUser)
    render 'api/users/show'
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :purpose, :private, members: [])
  end
end
