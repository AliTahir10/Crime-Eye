require 'test_helper'

class JsonControllerTest < ActionDispatch::IntegrationTest
  test "should get police_api" do
    get json_police_api_url
    assert_response :success
  end

  test "should get twitter_api" do
    get json_twitter_api_url
    assert_response :success
  end

end
