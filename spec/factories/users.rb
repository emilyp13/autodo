FactoryGirl.define do
  factory :user do
    sequence(:email) { |m| "user#{m}@example.com" }
    password 'password'
    password_confirmation 'password'
  end
end
