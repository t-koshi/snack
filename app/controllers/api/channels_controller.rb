class Api::ChannelsController < ApplicationController
  def index
    @channels = Channel.all
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.creator = currentUser
    ChannelMembership.create(user: currentUser, channel: @channel)

    if @channel.save
      render :index
    else
      render json:
        ['Please fill in a channel name.'],
        status: 422
    end
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :purpose)
  end
end
