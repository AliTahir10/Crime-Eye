class MainController < ApplicationController
  before_action :disable_flash_messages, only: [:home]
  before_action :require_user_is_logged_in, only: [:home]

  def home; end

  def about; end
end
