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
end
