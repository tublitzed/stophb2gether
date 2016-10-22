require 'test_helper'

class ContactMailerTest < ActionMailer::TestCase
  test "new_contact_message" do
    mail = ContactMailer.new_contact_message(Contact.new({ email: 'bar@fly.com', name: 'me', message: 'foo' }))
    assert_equal "Contact from stophb2gether: bar@fly.com", mail.subject
    assert_equal ["tublitzed@gmail.com"], mail.to
    assert_equal ["stophb2gether@gmail.com"], mail.from
  end
end
