class HomeController < ApplicationController

  def index
    @appPath = 'home'

    if !logged_in?
      render layout: "non-auth"
    else
      @totalLosses = Loss.sum(:amount)
      @allLosses = Loss.get_active(3)

      render layout: "application"
    end
  end

end
