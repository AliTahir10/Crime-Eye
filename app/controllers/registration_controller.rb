class RegistrationController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      session[:user_id] = @user.id
      redirect_to main_home_path, notice: "You've successfully created your account!"
    else
      flash.now[:alert] = "Oh no, something went wrong."
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:email, :date_of_birth, :password, :password_confirmation)
  end
end
