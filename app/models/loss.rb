class Loss < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug, use: :slugged

  validates :slug, uniqueness: true

  def self.get_active(limit = nil, offset = 0)
    results = self.where(active: true)
      .order(date: :desc)
      .offset(offset).limit(limit)
  end

end
