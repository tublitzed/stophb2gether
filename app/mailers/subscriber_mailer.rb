class SubscriberMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.app_mailer.new_subscriber.subject
  #
  default from: "admin@stophb2gether.com"
  def new_subscriber
    @greeting = "Hi"

    mail to: "tublitzed@gmail.com", subject: "Success! You did it."
  end
end
