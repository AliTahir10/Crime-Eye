class SessionController < ApplicationController

  def new
  end

  def create
    user = User.find_by(email: params[:email])

    # Check if user exists and check if password is successfully matching to database
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: "Logged in successfully!"
    else
      # Security-wise it is better not to tell which part the user specifically got wrong
      flash[:alert] = "Invalid email or password."
      render :new
    end
  end

  # Logs out the user in current session
  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "You've logged out."
  end
end
