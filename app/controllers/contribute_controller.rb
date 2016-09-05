class ContributeController < ApplicationController
  before_action :require_auth
  before_action -> { set_app_path('contribute') }

  def index
  end
end
