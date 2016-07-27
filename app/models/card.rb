class Card < ActiveRecord::Base
  belongs_to :list
  belongs_to :board
  has_many :tasks

  validates :text, presence: true
  validates_inclusion_of :completed, in: [true, false]
  validates :list_id, presence: true
  validates :board_id, presence: true
end
