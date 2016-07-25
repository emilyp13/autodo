FactoryGirl.define do
  factory :board do
    sequence(:title) { |n| "Board Title#{n}" }
    user
  end
end
