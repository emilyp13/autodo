FactoryGirl.define do
  factory :list do
    sequence(:title) { |n| "List Title#{n}" }
    board
  end
end
