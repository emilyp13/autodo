class ChangeColumnName < ActiveRecord::Migration
  def change
    rename_column :boards, :type, :category
  end
end
