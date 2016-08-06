require 'httparty'

class HomeController < ApplicationController
  def index
    if !logged_in?
      render layout: "non-auth"
    else
      render layout: "application"
    end
  end

  def api
    url = Settings.WORDSMITH_TEMPLATE_URL + '?access_token=' + Settings.WORDSMITH_API_TOKEN
    data = {
      "date": "55",
      "amount": "weeeeeee",
      "title": "Foobar",
      "description": "orange",
      "notes": "car",
      "sources": "candy"
    }
    response = HTTParty.post(url, :query => { :data => data })
    template = response['data']['content']
    puts template
    render :action => :index
  end
end
