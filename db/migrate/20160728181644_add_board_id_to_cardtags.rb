class AddBoardIdToCardtags < ActiveRecord::Migration
  def change
    add_column(:cardtags, :board_id, :integer, {null: false})
  end
end
