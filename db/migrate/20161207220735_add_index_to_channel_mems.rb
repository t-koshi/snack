class AddIndexToChannelMems < ActiveRecord::Migration[5.0]
  def change
    add_index :channel_memberships, :user_id
  end
end
