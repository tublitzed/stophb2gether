class AboutController < ApplicationController
  before_action :require_auth
  before_action -> { set_app_path('about') }

  def index
    AppMailer.new_subscriber().deliver_now
  end
end
