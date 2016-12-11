class ChangePrivacy < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :private, :boolean
    add_column :channels, :private, :boolean
  end
end
