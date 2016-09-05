Rails.application.routes.draw do
  post 'subscribers/create'

  root 'home#index'
  #get 'signup'  => 'users#new'

  get    'login'   => 'sessions#new'
  post   'login'   => 'sessions#create'
  delete 'logout'  => 'sessions#destroy'

  #get '/store' => 'store#index'
  get '/resources' => 'resources#index'
  get '/losses' => 'losses#index'
  get '/about' => 'about#index'
  get '/contact' => 'contact#index'

  resources :users
  resources :losses
  resources :subscribers

  #API
  post    'api/add'   => 'api#add'
end
