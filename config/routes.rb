# For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

Rails.application.routes.draw do
  get 'registration/new'
  get 'json/police_api'
  get 'json/twitter_api'
  get 'main/home'
  get 'main/about'
  get 'main/emergency'

  get 'sign_up', to: 'registration#new'
  post 'sign_up', to: 'registration#create'

  get 'login', to: 'session#new'
  post 'login', to: 'session#create'

  delete 'logout', to: 'session#destroy'

  root 'main#home'

  resources :contact, only: [:index, :new, :create]
end
