class Board < ActiveRecord::Base
  has_many :lists
  has_many :tasks
  has_many :cards
  has_many :cardtags
  belongs_to :user

  validates :title, presence: true
end
