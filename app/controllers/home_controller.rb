class HomeController < ApplicationController
  def index
    if !logged_in?
      render layout: "non-auth"
    else
      render layout: "application"
    end
  end
end
