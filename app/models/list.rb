class List < ActiveRecord::Base
  has_many :cards
  belongs_to :board
  validates :title, presence: true
  validates :board_id, presence: true
end
