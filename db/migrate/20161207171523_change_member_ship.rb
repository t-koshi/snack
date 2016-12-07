class ChangeMemberShip < ActiveRecord::Migration[5.0]
  def change
    remove_column :channel_memberships, :creator_id
    add_column :channel_memberships, :user_id, :integer
    add_index :channel_memberships, :user_id
    add_index :channel_memberships, [:channel_id, :user_id], :unique => true
  end
end
