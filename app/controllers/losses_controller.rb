class LossesController < ApplicationController
    before_action :require_auth

    def index
      set_app_path('losses')
      @totalLosses = Loss.sum(:amount)
      @allLosses = Loss.get_active
    end

    def show
      set_app_path('loss')
      @loss = Loss.find_by_slug(params[:id])
    end
end
