class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:add]

  def add
    if request.headers["Authorization"] != Settings.WWST_AUTHORIZATION_HEADER
      render :json => { success: false }, status: :error
      return
    end
    puts "HERE0"
    puts request.raw_post
    puts "HERE1"
    puts request.body
    puts "HERE2"
    puts request.params
    puts "HERE3"
    formatted = formatValues(request.params['_json'])
    puts formatted
    built = Builder.buildLoss(formatted)
    render :json => built
  end

  private

  def formatValues(postValues)
    postValues = postValues[0]
    puts 'new post: '
    puts postValues
    formatted = {}
    formatted['date'] = postValues['date']
    formatted['amount'] = postValues['amount']
    formatted['title'] = postValues['title']
    formatted['description'] = postValues['description']
    formatted['notes'] = postValues['notes']
    formatted['sources'] = postValues['sources']
    puts 'SENDING:'
    puts formatted
    formatted
  end

end
