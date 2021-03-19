Rails.application.routes.draw do
  get 'json/police_api'
  get 'json/twitter_api'
  get 'main/home'
  get 'main/about'
  get 'main/emergency'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'main#home'
end
