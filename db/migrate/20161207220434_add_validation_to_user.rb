class AddValidationToUser < ActiveRecord::Migration[5.0]
  def change
    remove_column :channel_memberships, :user_id
    add_column :channel_memberships, :user_id, :integer, null: false
  end
end
