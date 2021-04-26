class PasswordController < ApplicationController
  before_action :require_user_is_logged_in, except: [:new, :create, :mailer_edit, :mailer_update]

  def edit
  end

  def update
    if Current.user.update(password_params)
      redirect_to account_path, notice: "Password successfully updated."
    else
      render :edit
    end
  end

  def new
  end

  def create
    @user = User.find_by(email: params[:email])

    # If user exists in database by email
    if @user.present?
      #Send reset email now in the background
      PasswordMailer.with(user: @user).reset.deliver_now
    end

    redirect_to login_path, notice: "If this email exists, we have emailed you a reset link."
  end

  def mailer_edit
    #Takes token from url and look up user via user.signed_id method
    #This will throw an error, which will be rescued below
    @user = User.find_signed!(params[:token], purpose: "password_reset")
    rescue ActiveSupport::MessageVerifier::InvalidSignature
      redirect_to login_path, alert: "Your token has expired. Please try again."
  end

  def mailer_update
    @user = User.find_signed!(params[:token], purpose: "password_reset")
    if @user.update(password_params)
      redirect_to login_path, notice: "Your password was reset successfully."
    else
      render :mailer_edit
    end
  end

  def password_params
    params.require(:user).permit(:password, :password_confirmation)
  end
end
