class Cardtag < ActiveRecord::Base
  belongs_to :tag
  belongs_to :card
  belongs_to :board
end
