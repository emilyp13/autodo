class DropColorColumnFromTags < ActiveRecord::Migration
  def change
    remove_column :tags, :color, :string
  end
end
