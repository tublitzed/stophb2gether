# Preview all emails at http://localhost:3000/rails/mailers/subscriber_mailer
class SubscriberMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/subscriber_mailer/new_subscriber
  def new_subscriber
    SubscriberMailer.new_subscriber
  end

end
