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

  has_many :channel_memberships

  has_many(
    :members,
    through: :channel_memberships,
    source: :user
  )

  belongs_to(
    :creator,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: :User
  )


end
