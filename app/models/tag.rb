class Tag < ActiveRecord::Base
  belongs_to :board
  has_many :cardtags
  validates :label, presence: true
  validates :color, presence: true
end
