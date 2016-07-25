class Board < ActiveRecord::Base
  has_many :lists
  has_many :cards

  validates :title, presence: true
end
