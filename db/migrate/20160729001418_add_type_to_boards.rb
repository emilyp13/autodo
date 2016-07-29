class AddTypeToBoards < ActiveRecord::Migration
  def change
    add_column(:boards, :type, :string, {null: false})
  end
end
