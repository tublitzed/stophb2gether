# This is done so that we do not accidentally store non-unique emails in the DB.
class AddIndexToUsersEmail < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :email, unique: true
  end
end
