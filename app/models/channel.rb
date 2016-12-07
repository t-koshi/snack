# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  purpose    :string
#  creator_id :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ApplicationRecord
  validates :creator_id, :name, presence: true

  has_many :channel_ownerships,
    classname: :ChannelMembership,
    primary_key: :id,
    foreign_key: :

  belongs_to :creator
end
