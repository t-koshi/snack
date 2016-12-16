class Api::MessagesController < ApplicationController
  def index
    @messages = Message.where(channel_id: (Channel.find_by(name: params[:channel_name])).id)
  end

  def create
    @message = Message.new(message_params)
    @channel = Channel.find_by(name: params[:channel_name])
    @message.channel = @channel
    @message.author = current_user

    if @message.save
      # Pusher.trigger(@channel.name, 'message_sent', {})
      # Pusher.trigger('channel', 'message_sent', @message.to_json)
      Pusher.trigger('channel', 'message_sent', (render :show))
      # render :show
    else
      render json:
        @message.errors.full_messages,
        status: 422
    end
  end

  private

  def message_params
    params.require(:message).permit(:body)
  end
end
