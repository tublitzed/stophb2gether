class AboutController < ApplicationController
  before_action :require_auth
  before_action -> { set_app_path('about') }

  def index
    logger.info('WTF');
    foo = ENV["GMAIL_USERNAME"]
    logger.info(ENV["GMAIL_USERNAME"])
    logger.info(ENV["GMAIL_PASSWORD"])
    logger.info(Settings.GMAIL_USERNAME)
    SubscriberMailer.new_subscriber().deliver_now
  end
end
