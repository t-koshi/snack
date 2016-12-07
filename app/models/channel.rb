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
end
