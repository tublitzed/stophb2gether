class Loss < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug, use: :slugged

  validates :slug, uniqueness: true

  def self.get_active(limit = nil, offset = 0, featured_only = false)
    params = { active: true }
    if featured_only
      params['featured'] = true
    end
    results = self.where(params)
      .order(date: :desc)
      .offset(offset).limit(limit)
  end
end
