class HomeController < ApplicationController
  def index
    if !logged_in?
      render layout: "non-auth"
    else
      # TODO: cache this.
      @totalLosses = Loss.sum(:amount)
      @allLosses = Loss.all

      puts @allLosses
      render layout: "application"
    end
  end
end
