class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where(channel_id: Channel.find_by(name: params[:channelName]).id)
  end

  def create
    @message = Message.new(message_params)
    @channel = Channel.find(@message.channel_id)

    if @message.save
      Pusher.trigger(@channel.name, 'message_sent', {})
    else
      render json:
        @messsage.erros.full_messages,
        status: 422
    end
  end
end
