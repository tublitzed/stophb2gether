class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:add]

  def add
    if request.headers["Authorization"] != Settings.WWST_AUTHORIZATION_HEADER
      render :json => { success: false }, status: :error
      return
    end
    formatted = formatValues(ActiveSupport::JSON.decode(request.raw_post))
    built = Builder.buildLoss(formatted)
    logger.info(built)
    render :json => ActiveSupport::JSON.encode(built)
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
    formatted
  end

end
