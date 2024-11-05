class AddShortNameToLosses < ActiveRecord::Migration[5.0]
  def change
    add_column :losses, :short_name, :string, null: true, default: nil
  end
end
