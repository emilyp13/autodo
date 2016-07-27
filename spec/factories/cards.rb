FactoryGirl.define do
  factory :card do
    sequence(:text) { |n| "Card Text#{n}" }
    sequence(:description) { |n| "description#{n}" }
    completed false
    list
    board
  end
end
