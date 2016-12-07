class ChannelsController < ApplicationController
  def index
    @channels = Channel.all
  end

  def create
    @channel = Channel.new(channel_params)
    @channel.creator = currentUser

    if @channel.save
      ChannelMembership.create({
        channel: @channel,
        user: currentUser
        })
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
