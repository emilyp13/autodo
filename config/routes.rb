Rails.application.routes.draw do
  devise_for :users

  as :user do
    get '/' => 'devise/sessions#new'
  end

  namespace :api do
    resources :boards do
      resources :lists do
        resources :cards do
        end
      end
      resources :cards do
        resources :tasks
      end
      resources :tasks
    end
    resources :cards
    resources :lists
  end

  root to: "devise/sessions#new"
  resources :boards, only: [:index, :show, :new, :create, :destroy] do
    resources :cards, only: [:edit, :update]
  end
end
