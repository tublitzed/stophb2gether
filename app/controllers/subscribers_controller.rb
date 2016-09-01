class SubscribersController < ApplicationController

  def create
    @subscriber = Subscriber.find_or_create_by(subscriber_params)

    if @subscriber.save
        flash[:success] = "Thanks! #{@subscriber.email} is on the list!"
        SubscriberMailer.new_subscriber(@subscriber).deliver_now
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
