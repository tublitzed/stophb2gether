class MailingListController < ApplicationController
  def join
    puts params[:email]
    puts list_params
    email = list_params[:email]
    flash[:success] = "Thanks, #{email}, you're on the list!"
    render 'home/index'
    #redirect_to store_path
  end

  private

  def list_params
    params.require(:mailing_list).permit(:email)
  end
end
