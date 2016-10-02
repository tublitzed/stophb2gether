class HomeController < ApplicationController
    before_action -> { set_app_path('home') }

    def index
        @totalLosses = Loss.sum(:amount)
        @allLosses = Loss.get_active(nil, 0)
        @featuredLosses = @allLosses.where('featured', true)
        @chartDataLossesOverTime = build_chart_data.to_json

        # @subscriber = Subscriber.new
    end

    private

    def build_chart_data
        @allLosses.map do |loss|
            {
                title: loss.title,
                amount: loss.amount,
                runningTotal: loss.running_total,
                date: loss.date.to_date
            }
        end
    end
end
