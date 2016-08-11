Rails.application.routes.draw do
  root 'home#index'
  resources :users
  #get 'signup'  => 'users#new'

  get    'login'   => 'sessions#new'
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'

  get '/losses' => 'losses#index'
  get '/about' => 'about#index'

  resources :losses
  # authenticated :user do
  #   resources :losses
  # end

  #API
  post    'api/add'   => 'api#add'
end
