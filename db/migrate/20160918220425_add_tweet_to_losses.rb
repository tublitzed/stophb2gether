class AddTweetToLosses < ActiveRecord::Migration
  def change
    add_column :losses, :tweet, :string, null: true, default: nil
  end
end
