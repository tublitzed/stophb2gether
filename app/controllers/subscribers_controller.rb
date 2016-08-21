class SubscribersController < ApplicationController

  def create
    @subscriber = Subscriber.new(subscriber_params)
    if @subscriber.save
        flash[:success] = "Thanks! #{@subscriber.email} is on the list!"
        redirect_to store_path
    else
        flash[:error] = "Error joining mailing list!"
        redirect_to root_path
    end
  end

  private

  def subscriber_params
    params.require(:subscriber).permit(:email)
  end
end
