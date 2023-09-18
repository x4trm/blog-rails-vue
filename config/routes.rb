Rails.application.routes.draw do
  
  namespace :admin do
    resources :posts do
      resources :comments
    end
  end
  
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  
  get '/member-data', to: 'members#show'
  
  resources :posts
  
  resources :comments
  
  resources :posts do
    resources :comments
  end
  
end
