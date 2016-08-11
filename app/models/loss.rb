class Loss < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug, use: :slugged

  validates :slug, uniqueness: true

  def self.get_active(limit = nil)
    results = self.all.order(date: :desc).select{ |loss| loss.amount.present? }
    if limit
      results = results.slice(0, limit)
    end
    results
  end

end
