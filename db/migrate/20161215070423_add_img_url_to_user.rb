class AddImgUrlToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :img_url, :string, presence: true
  end
end
