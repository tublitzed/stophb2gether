class Loss < ActiveRecord::Base
  extend FriendlyId
  friendly_id :slug, use: :slugged

  validates :slug, uniqueness: true

  def self.get_active
    self.all.order(date: :desc).select{ |loss| loss.amount.present? }
  end

end
