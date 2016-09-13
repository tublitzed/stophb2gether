class AddPhotoCreditColToLosses < ActiveRecord::Migration
  def change
    add_column :losses, :photo_credit, :string, null: true, default: nil
  end
end
