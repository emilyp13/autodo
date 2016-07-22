Rails.application.routes.draw do
  devise_for :users
  resources :lists do
    resources :cards, only: [:new, :index, :create, :show, :update]
  end
  namespace :api do
    resources :lists do
      resources :cards
    end
    resources :cards
  end

  resources :cards, only: [:index, :create, :edit, :show, :destroy]
  root to: 'lists#index'
end
