class Board < ActiveRecord::Base
  has_many :lists
  has_many :cards
  belongs_to :user

  validates :title, presence: true
end
