class AddPhotoCreditAgainToLosses < ActiveRecord::Migration[5.0]
  def change
    add_column :losses, :photo_credit, :string, null: true, default: nil
  end
end
