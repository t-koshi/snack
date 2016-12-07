class ChannelMembership < ApplicationRecord
  has_many: users
  has_many: channels
end
