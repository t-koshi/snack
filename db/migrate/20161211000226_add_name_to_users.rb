class AddNameToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :firstname, :string
    add_column :users, :lastname, :string
    add_index :users, :lastname
    add_index :users, :firstname
  end
end
