require 'test_helper'

class SubscriberMailerTest < ActionMailer::TestCase
  test "new_subscriber" do
    mail = SubscriberMailer.new_subscriber(Subscriber.new({ email: 'foo@bar.com' }))
    assert_equal "New subscriber: foo@bar.com", mail.subject
    assert_equal ["tublitzed@gmail.com"], mail.to
    assert_equal ["stophb2gether@gmail.com"], mail.from
  end

end
