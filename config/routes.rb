Rails.application.routes.draw do
  resources :lists do
    resources :cards
  end

  resources :cards, only: [:index, :create]
  root to: 'lists#index'
end
