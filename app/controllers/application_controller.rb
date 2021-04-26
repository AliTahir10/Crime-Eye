class ApplicationController < ActionController::Base
  before_action :set_current_user

  def disable_flash_messages
    @disable_flash_messages = true
  end

  def set_current_user
    if session[:user_id]
      Current.user = User.find_by(id: session[:user_id])
    end
  end

  def require_user_is_logged_in
    redirect_to login_path, alert: "You must be signed into your account to do that." if Current.user.nil?
  end
end
