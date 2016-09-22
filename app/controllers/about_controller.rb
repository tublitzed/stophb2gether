class AboutController < ApplicationController
  before_action :set_active_tab
  before_action -> { set_app_path('about') }

  def index
    puts params[:tab]
  end

  private

  def set_active_tab
    if params[:tab] == 'calculations'
      @active_tab = params[:tab]
    else
      @active_tab = 'general'
    end
  end
end
