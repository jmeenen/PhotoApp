class User < ActiveRecord::Base

  has_many :photos
  has_many :comments

  validates_presence_of :first_name, :message => "required"

  validates_presence_of :last_name, :message => "required"

  validates_presence_of :login, :message => "required"

  def full_name
    return self.first_name + " " + self.last_name
  end

  def validate_password
    if (password == "") then
      errors.add(:password, "required")
    end
  end

  validate :validate_password

  def password_valid?(candidate)
    return self.password_digest == Digest::SHA1.hexdigest(candidate + self.salt.to_s)
  end

  def password
    return @word
  end

  def password=(word)
    @word = word
    self.salt = Random.rand
    self.password_digest = Digest::SHA1.hexdigest(word + self.salt.to_s)
  end

end