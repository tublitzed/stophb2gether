class Contact < ActiveRecord::Base
  # TODO: move this to somewhere shared with other models
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  before_save { self.email = email.downcase }

  validates :email, presence: true,
                    length: { maximum: 255 },
                    format: { with: VALID_EMAIL_REGEX }

  validates :name, presence: true, length: { maximum: 255 }
  validates :message, presence: true, length: { maximum: 2048 }
end
