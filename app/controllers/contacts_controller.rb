class ContactsController < ApplicationController
  before_action :require_auth
  before_action -> { set_app_path('contact') }

  def index
    @contact = Contact.new
  end

  def create
    @contact = Contact.new(contact_params)
    if @contact.save
        flash[:success] = "Thanks, #{@contact.name}! Your message has been delivered."
        ContactMailer.new_contact_message(@contact).deliver_now
        redirect_to root_path
    else
        flash[:error] = "Error sending message!"
        redirect_to contact_path
    end
  end

  private

  def contact_params
    params.require(:contact).permit(:email, :name, :message)
  end
end
