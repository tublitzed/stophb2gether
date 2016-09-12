class HomeController < ApplicationController
  before_action -> { set_app_path('home') }

  def index
    @totalLosses = Loss.sum(:amount)
    @allLosses = Loss.get_active(nil, 0, true)
    @subscriber = Subscriber.new
  end

end
