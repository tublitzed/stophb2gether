class LossesController < ApplicationController
    before_action :require_auth
    before_action :set_active_tab
    PER_PAGE = 10

    def index
      @perPage = PER_PAGE
      set_app_path('losses')
      @totalLosses = Loss.sum(:amount)
      @allLosses = Loss.get_active
    end

    def show
      set_app_path('loss')
      @loss = Loss.find_by_slug(params[:id])

      if @loss.nil?
        render_404
      end
    end

    private
    def set_active_tab
      if params[:tab] == 'other'
        @active_tab = params[:tab]
      else
        @active_tab = 'losses'
      end
    end
end
