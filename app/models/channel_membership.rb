# == Schema Information
#
# Table name: channel_memberships
#
#  id         :integer          not null, primary key
#  channel_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer
#

class ChannelMembership < ApplicationRecord
  validates :user_id, :channel_id, presence: true
  validates :user_id, uniqueness: { scope: :channel_id }

  belongs_to :user
  belongs_to :channel
end
