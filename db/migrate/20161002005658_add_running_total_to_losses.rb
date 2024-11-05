class AddRunningTotalToLosses < ActiveRecord::Migration[5.0]
  def change
    add_column :losses, :running_total, :decimal
  end
end
