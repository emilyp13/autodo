class Task < ActiveRecord::Base
  belongs_to :card
  belongs_to :board
  validates :text, presence: true
  validates_inclusion_of :completed, in: [true, false]
  validates :card_id, presence: true
end
