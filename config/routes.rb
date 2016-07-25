Rails.application.routes.draw do
  devise_for :users

  as :user do
    get '/' => 'boards#index'
  end

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
end
