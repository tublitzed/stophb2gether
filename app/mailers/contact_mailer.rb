class ContactMailer < ApplicationMailer
  default from: "stophb2gether@gmail.com"
  def new_contact_message(contact)
    @contact = contact
    mail to: "tublitzed@gmail.com", subject: "Contact from stophb2gether: #{contact.email}"
  end
end
