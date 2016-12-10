class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.creator = currentUser

    if @channel.save
      ChannelMembership.create(user: currentUser, channel: @channel)
      render :index
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
    params.require(:channel).permit(:name, :purpose)
  end
end
