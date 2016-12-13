class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where(channel_id: Channel.find_by(title: params[:channelName]).id)
  end
end
