class List < ActiveRecord::Base
  has_many :cards
  belongs_to :board
  validates :title, presence: true
  validates :board_id, presence: true

  def self.generate_calendar(date, board_id)
    i = 0
    while i < 8 do
      new_date = date + i
      date_title = new_date.strftime('%a %b %d')
      List.create(title: date_title, board_id: board_id)
      i += 1
    end
  end
end
