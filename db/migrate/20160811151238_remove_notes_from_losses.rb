class RemoveNotesFromLosses < ActiveRecord::Migration
  def change
    remove_column :losses, :notes
  end
end
