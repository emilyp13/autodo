Rails.application.routes.draw do
  namespace :api do
    resources :boards do
      resources :lists do
        resources :cards
      end
      resources :cards
    end
    resources :cards
    resources :lists
  end

  resources :boards, only: [:index, :show, :new, :create]
  root to: 'boards#index'
end
