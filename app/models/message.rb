# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  body       :text             not null
#  author_id  :integer          not null
#  channel_id :integer          not null
#  edited     :boolean          default(FALSE), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ApplicationRecord
  # can't use presence validation with boolean field

  validates :author_id, :channel_id, :body, presence: true
  validates :edited, inclusion: { in: [true, false] }

  belongs_to (
    :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User
  )

  belongs_to (
    :channel,
    primary_key: :id,
    foreign_key: :channel_id,
    class_name: :Channel
  )
end
