class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :label, null: false
      t.string :color, null: false
      t.integer :board_id, null: false
      t.timestamps
    end
  end
end
