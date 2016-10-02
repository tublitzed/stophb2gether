class AddRunningTotalToLosses < ActiveRecord::Migration
  def change
    add_column :losses, :running_total, :decimal
  end
end
