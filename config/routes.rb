Rails.application.routes.draw do
  get '/ripple_federation', to: 'federation#index'
end
