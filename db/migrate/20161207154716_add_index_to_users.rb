class AddIndexToUsers < ActiveRecord::Migration[5.0]
  def change
    add_index :users, :session_token
    add_index :users, :email
  end
end
