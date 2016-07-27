class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :text, null: false
      t.integer :card_id, null: false
      t.boolean :completed, null: false, default: false
    end
  end
end
