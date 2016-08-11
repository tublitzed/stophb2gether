class ContactController < ApplicationController
  before_action :require_auth
  before_action -> { set_app_path('contact') }

  def index
  end
end
