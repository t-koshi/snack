class CreateChannelMembershipmodels < ActiveRecord::Migration[5.0]
  def change
    create_table :channel_membershipmodels do |t|

      t.timestamps
    end
  end
end
