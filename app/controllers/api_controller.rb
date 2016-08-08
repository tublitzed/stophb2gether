class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:add]

  def add
    if request.headers["Authorization"] != Settings.WWST_AUTHORIZATION_HEADER
      render :json => { success: false }, status: :error
      return
    end
    puts request.body
    puts request.params[:api]
    Builder.buildLoss(formatValues(request.params[:api]))
    render :json => request.body
  end

  private

  def formatValues(postValues)
    formatted = {}
    formatted['date'] = postValues['date']
    formatted['amount'] = postValues['amount']
    formatted['title'] = postValues['title']
    formatted['description'] = postValues['description']
    formatted['notes'] = postValues['notes']
    formatted['sources'] = postValues['sources']
    puts formatted
    formatted
  end

end
