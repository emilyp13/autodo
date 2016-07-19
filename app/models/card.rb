class Card < ActiveRecord::Base
  belongs_to :list

  validates :text, presence: true
  validates_inclusion_of :completed, in: [true, false]
  validates :list_id, presence: true
end
