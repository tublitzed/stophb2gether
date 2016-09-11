class LossesController < ApplicationController
    before_action :require_auth
    before_action :set_active_tab
    PER_PAGE = 10
    DEFAULT_PAGE = 1

    def index
      @perPage = PER_PAGE
      set_app_path('losses')
      @totalLosses = Loss.sum(:amount)
      @allLosses = Loss.get_active
      @currentPage = get_page
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

    def get_page
      page = params[:page] ? params[:page].to_i : DEFAULT_PAGE
      pageCount = (@allLosses.size/@perPage.to_f).ceil

      if (page > pageCount || page == 0)
        page = DEFAULT_PAGE
      end

      page
    end
end
