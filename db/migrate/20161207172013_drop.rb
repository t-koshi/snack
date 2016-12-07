class Drop < ActiveRecord::Migration[5.0]
  def change
    drop_table :channel_membershipmodels
  end
end
