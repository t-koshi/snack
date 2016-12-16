class RemoveImgUrlFromUsers < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :img_url
  end
end
