class HomeController < ApplicationController
  def index
    if !logged_in?
      render layout: "non-auth"
    else
      @totalLosses = Loss.sum(:amount)
      @allLosses = Loss.get_active

      render layout: "application"
    end
  end
end
