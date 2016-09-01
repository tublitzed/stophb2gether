class AboutController < ApplicationController
  before_action :require_auth
  before_action -> { set_app_path('about') }

  def index
    logger.info('WTF');
    logger.info(ENV["GMAIL_USERNAME"])
    SubscriberMailer.new_subscriber().deliver_now
  end
end
