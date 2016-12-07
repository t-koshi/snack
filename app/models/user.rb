# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  email           :string           not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :password_digest, :session_token, :email, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true

  after_initialize :ensure_session_token

  has_many :channel_memberships

  has_many(
    :joined_channels,
    through: :channel_memberships,
    source: :channel
  )

  has_many(
    :created_channels,
    primary_key: :id,
    foreign_key: :creator_id,
    class_name: :Channel
  )

  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    (user && BCrypt::Password.new(user.password_digest).is_password?(password)) ? user : nil
  end

  def reset_session_token!
    token = User.generate_session_token
    self.session_token = token
    self.save!
    return token
  end

  def self.generate_session_token
    token = SecureRandom::urlsafe_base64(16)
    while User.find_by(session_token: token)
      token = SecureRandom::urlsafe_base64(16)
    end
    token
  end

  private

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

end
