class AddColsToLosses < ActiveRecord::Migration[5.0]
  def change
    add_column :losses, :date, :timestamp
    add_column :losses, :amount, :decimal
    add_column :losses, :title, :varchar
    add_column :losses, :slug, :varchar
    add_column :losses, :description, :varchar
    add_column :losses, :template, :varchar
    add_column :losses, :notes, :json
    add_column :losses, :sources, :json
  end
end
