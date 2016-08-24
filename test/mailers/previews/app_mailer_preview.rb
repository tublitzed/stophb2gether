# Preview all emails at http://localhost:3000/rails/mailers/app_mailer
class AppMailerPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/app_mailer/new_subscriber
  def new_subscriber
    AppMailer.new_subscriber
  end

end
