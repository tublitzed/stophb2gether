class StoreController < ApplicationController
  before_action -> { set_app_path('store') }

  def index
    # disable store for now
    redirect_to root_url
  end
end
