require 'test_helper'

class UsersControllerTest < ActionController::TestCase

  def setup
    @user       = users(:rachel)
    @other_user = users(:archer)
  end

  # test "should get new" do
  #   get :new
  #   assert_response :success
  # end

  test "should redirect show when logged in as wrong user" do
    log_in_as(@other_user)
    get :show, id: @user
    assert flash.empty?
    assert_redirected_to root_url
  end

end
