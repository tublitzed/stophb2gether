Rails.application.routes.draw do
  root 'home#index'
  resources :users
  #get 'signup'  => 'users#new'

  get    'login'   => 'sessions#new'
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'

  get '/losses' => 'loss#index'
  get '/about' => 'about#index'
  #API
  post    'api/add'   => 'api#add'
end
