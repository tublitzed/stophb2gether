class SubscriberMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.app_mailer.new_subscriber.subject
  #
  default from: "stophb2gether@gmail.com"
  def new_subscriber(subscriber)
    @subscriber = subscriber
    mail to: "tublitzed@gmail.com", subject: "New subscriber: #{subscriber.email}"
  end
end
