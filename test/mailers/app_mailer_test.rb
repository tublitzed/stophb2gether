require 'test_helper'

class AppMailerTest < ActionMailer::TestCase
  test "new_subscriber" do
    mail = AppMailer.new_subscriber
    assert_equal "New subscriber", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
