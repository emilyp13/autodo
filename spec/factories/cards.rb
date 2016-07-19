FactoryGirl.define do
  factory :card do
    sequence(:text) { |n| "Card Text#{n}" }
    completed false
    list
  end
end
