# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161215195649) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channel_memberships", force: :cascade do |t|
    t.integer  "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id",    null: false
    t.index ["channel_id"], name: "index_channel_memberships_on_channel_id", using: :btree
    t.index ["user_id"], name: "index_channel_memberships_on_user_id", using: :btree
  end

  create_table "channels", force: :cascade do |t|
    t.string   "name",       null: false
    t.string   "purpose"
    t.integer  "creator_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean  "private"
    t.index ["creator_id"], name: "index_channels_on_creator_id", using: :btree
    t.index ["name"], name: "index_channels_on_name", unique: true, using: :btree
  end

  create_table "messages", force: :cascade do |t|
    t.text     "body",                       null: false
    t.integer  "author_id",                  null: false
    t.integer  "channel_id",                 null: false
    t.boolean  "edited",     default: false, null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.index ["author_id"], name: "index_messages_on_author_id", using: :btree
    t.index ["channel_id"], name: "index_messages_on_channel_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",            null: false
    t.string   "email",               null: false
    t.string   "password_digest",     null: false
    t.string   "session_token",       null: false
    t.datetime "created_at",          null: false
    t.datetime "updated_at",          null: false
    t.string   "firstname"
    t.string   "lastname"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.index ["email"], name: "index_users_on_email", using: :btree
    t.index ["firstname"], name: "index_users_on_firstname", using: :btree
    t.index ["lastname"], name: "index_users_on_lastname", using: :btree
    t.index ["session_token"], name: "index_users_on_session_token", using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

end
