Rails.application.routes.draw do
  post 'subscribers/create'

  root 'home#index'
  #get 'signup'  => 'users#new'

  # get    'login'   => 'sessions#new'
  # post   'login'   => 'sessions#create'
  # delete 'logout'  => 'sessions#destroy'

  #get '/store' => 'store#index'
  get '/contribute' => 'contribute#index'
  get '/resources' => 'resources#index'
  get '/losses' => 'losses#index'
  get '/about' => 'about#index'
  get '/contact' => 'contacts#index'
  get '/about/calculations' => 'about#calculations'

  resources :users
  resources :losses
  resources :subscribers
  resources :contacts

  #API
  post    'api/add'   => 'api#add'
end
