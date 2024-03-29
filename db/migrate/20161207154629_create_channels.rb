class CreateChannels < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.string :name, null: false
      t.string :purpose
      t.integer :creator_id, null: false

      t.timestamps
    end

    add_index :channels, :creator_id
    add_index :channels, :name, unique: true
  end
end
