class AboutController < ApplicationController
  before_action :require_auth
  before_action -> { set_app_path('about') }

  def index
    logger.info('PLEASE_DEAR_GOD_WORK');
    foo = ENV["GMAIL_USERNAME"]
    bar = ENV['GMAIL_PASSWORD']
    logger.info(foo)
    logger.info(bar)
    SubscriberMailer.new_subscriber().deliver_now
  end
end
