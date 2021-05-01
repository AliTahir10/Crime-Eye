class OmniauthCallbacksController < ApplicationController
  def create
    #render plain: "Success
    Rails.logger.info auth_hash
    @user = TwitterUser.find_or_create_from_auth_hash(auth_hash)
    session[:twitter_user_id] = @user.id
    redirect_to main_home_path, notice: "Logged in using Twitter successfully!"
  end

  protected
  def auth_hash
    request.env['omniauth.auth']
  end
end
