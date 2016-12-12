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
#  private    :boolean
#

class Channel < ApplicationRecord
  validates :creator_id, :name, presence: true
  validates :private, inclusion: { in: [true, false] }

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

  def private_channels(user)
    @private_channels = user.joined_channels.where(private: true)
  end

  def public_channels
    @public_channels = Channel.where(private: false)
  end

  def stringified_date
    month = self.created_at.strftime('%B')
    year = self.created_at.strftime('%Y')
    @stringfied_date = "#{month} #{self.stringfy_day}, #{year}"
  end

  def stringfy_day
    day = (self.created_at.strftime('%d'))

    if day[-1]== '1' && day != '11'
      "#{day}st"
    elsif day[-1] == '2' && day != '12'
      "#{day}nd"
    elsif day[-1] == '3' && day != '12'
      "#{day}rd"
    else
      "#{day}th"
    end
  end
end
