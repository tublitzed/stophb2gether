class RemoveNotesFromLosses < ActiveRecord::Migration[5.0]
  def change
    remove_column :losses, :notes
  end
end
