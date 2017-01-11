json.extract! user, :id, :username, :name

json.img_url asset_path(user.avatar.url)
