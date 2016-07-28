Rails.application.routes.draw do
  devise_for :users

  as :user do
    get '/' => 'devise/sessions#new'
  end

  namespace :api do
    resources :boards do
      resources :lists do
        resources :cards
      end
      resources :cards do
        resources :cardtags
        resources :tasks
      end
      resources :tasks
    end
    resources :cards
    resources :lists
  end

  root to: "devise/sessions#new"
  resources :boards, only: [:index, :show, :new, :create] do
    resources :cards, only: [:edit, :update]
    resources :tags, only: [:new, :create]
  end
  resources :cards do
    resources :cardtags
  end
  resources :cardtags
  resources :tags
end
