class HomeController < ApplicationController
  def index
    if !logged_in?
      render layout: "non-auth"
    else
      # TODO: cache this.
      @totalLosses = Loss.sum(:amount)
      render layout: "application"
    end
  end
end
