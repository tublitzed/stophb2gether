class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  include SessionsHelper

  def require_auth
    if !logged_in?
      redirect_to root_url
      return
    end
  end

  def set_app_path(path)
    @appPath = path
  end

end
