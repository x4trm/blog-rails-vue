Rails.application.routes.draw do
  resources :posts
  resources :comments
  resources :posts do
    resources :comments
  end
end
