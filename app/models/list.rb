class List < ActiveRecord::Base
  has_many :cards
  validates :title, presence: true
end
