Rails.application.routes.draw do

  namespace :api, defaults: { format: :json }  do
    resource :session, only: [:create, :destroy]
    resources :users, only: [:create, :index, :update]
    resources :messages, only: [:index, :create, :update]
    resources :channels, only: [:index, :create]

    get '/channels/:channel_name', to: 'channels#show', as: 'channel'
    patch '/channels/:channel_name', to: 'channels#update', as: 'channel_update'
  end



  root 'static_pages#root'
end
