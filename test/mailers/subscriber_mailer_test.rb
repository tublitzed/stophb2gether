require 'test_helper'

class SubscriberMailerTest < ActionMailer::TestCase
  test "new_subscriber" do
    mail = SubscriberMailer.new_subscriber
    assert_equal "Success! You did it.", mail.subject
    assert_equal ["tublitzed@gmail.com"], mail.to
    assert_equal ["admin@stophb2gether.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
