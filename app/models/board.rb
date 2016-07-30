class Board < ActiveRecord::Base
  has_many :lists
  has_many :tasks
  has_many :cards
  belongs_to :user

  validates :title, presence: true
  validates_inclusion_of :category, in: ["calendar", "kanban"]

  def self.check_today(board)
    first_list_date = board.lists.first.title.to_datetime
    if (Date.today - 1 > first_list_date)
      board.lists.first.destroy
      new_list_date = (first_list_date + 8).strftime('%a %b %d')
      List.create(title: new_list_date, board_id: board.id)
    end
  end
end
