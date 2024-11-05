class AddTweetToLosses < ActiveRecord::Migration[5.0]
  def change
    add_column :losses, :tweet, :string, null: true, default: nil
  end
end
