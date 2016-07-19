class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.text :text, null: false
      t.integer :list_id, null: false
      t.boolean :completed, null: false, default: false
      
      t.timestamps
    end
  end
end
