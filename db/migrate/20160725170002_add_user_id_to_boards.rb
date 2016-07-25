class AddUserIdToBoards < ActiveRecord::Migration
  def change
    add_column(:boards, :user_id, :integer, {null: false})
  end
end
