class CreateChannelMemberships < ActiveRecord::Migration[5.0]
  def change
    create_table :channel_memberships do |t|
      t.integer :channel_id, null: false
      t.integer :creator_id, null: false

      t.timestamps
    end

    add_index :channel_memberships, :channel_id
    add_index :channel_memberships, :creator_id
    add_index :channel_memberships, [:channel_id, :creator_id], :unique => true
  end
end
