class AddMoreColsToLosses < ActiveRecord::Migration
  def change
    add_column :losses, :active, :boolean, null: false, default: false
    add_column :losses, :featured, :boolean, null: false, default: false
  end
end
