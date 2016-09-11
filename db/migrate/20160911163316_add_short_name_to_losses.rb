class AddShortNameToLosses < ActiveRecord::Migration
  def change
    add_column :losses, :short_name, :string, null: true, default: nil
  end
end
