FactoryGirl.define do
  factory :board do
    sequence(:title) { |n| "Board Title#{n}" }
    category "kanban"
    user
  end
end
