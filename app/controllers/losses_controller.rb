class LossesController < ApplicationController
    before_action :require_auth

    def index
      @totalLosses = Loss.sum(:amount)
      @allLosses = Loss.get_active
    end

    def show
      @loss = Loss.find_by_slug(params[:id])
    end
end
