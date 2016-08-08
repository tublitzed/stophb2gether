class CreateLosses < ActiveRecord::Migration
  def change
    create_table :losses do |t|

      t.timestamps null: false
    end
  end
end
