class MainController < ApplicationController
  before_action :disable_flash_messages, only: [:home]

  def home
  end

  def about
  end

end
