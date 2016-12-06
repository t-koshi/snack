class User < ApplicationRecord
  validates :username, :password_digest, :session_token, :email, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :username, uniqueness: true

  after_initialize :ensure_session_token

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
