class MainController < ApplicationController
  before_action :disable_flash_messages, only: [:home]
  before_action :require_user_is_logged_in, only: [:home]

  require 'news-api'

  def home
    newsApi = News.new(ENV['NEWSAPI_KEY'])
    # @sources = newsApi.get_top_headlines(sources: "bbc-news")
    @sources = newsApi.get_everything(q: "crime+arrested", sources: "bbc-news")
    puts @sources.inspect

    @sources.each do |article|
      puts article.title
      puts article.description
      puts article.urlToImage
      puts article.publishedAt
      puts article.author
    end


  end

  def about; end
end
