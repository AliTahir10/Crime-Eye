class PasswordMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.password_mailer.reset.subject
  #
  def reset
    @user = params[:user]
    # Generates a unique token for the user to reset their password that expires in 15 minutes
    @token = @user.signed_id(purpose: "password_reset", expires_in: 15.minutes)
    mail to: @user.email
  end
end
