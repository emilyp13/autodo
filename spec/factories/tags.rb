FactoryGirl.define do
  factory :tag do
    sequence(:label) { |n| "label#{n}" }
    color "blue"
    board
  end
end
