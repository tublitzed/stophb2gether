class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:add]

#{"_json"=>[{"date"=>"2016-07-28T04:00:00.000Z"}, {"amount"=>5000000}, {"title"=>"Cancelled Deutsche Bank Expansion"}, {"slug"=>"cancelled-deutsche-bank-expansion"}, {"description"=>"After freezing jobs expansion in Cary over HB2, Deutsche Bank moves ahead with Florida expansion"}, {"notes"=>"anything else that should get sent on over"}, {"sources(links)"=>"http://www.bizjournals.com/triangle/news/2016/07/27/three-months-after-hb2-jobs-freeze-in-cary.html"}, {"trigger_send"=>444}], "controller"=>"api", "action"=>"add", "api"=>{"_json"=>[{"date"=>"2016-07-28T04:00:00.000Z"}, {"amount"=>5000000}, {"title"=>"Cancelled Deutsche Bank Expansion"}, {"slug"=>"cancelled-deutsche-bank-expansion"}, {"description"=>"After freezing jobs expansion in Cary over HB2, Deutsche Bank moves ahead with Florida expansion"}, {"notes"=>"anything else that should get sent on over"}, {"sources(links)"=>"http://www.bizjournals.com/triangle/news/2016/07/27/three-months-after-hb2-jobs-freeze-in-cary.html"}, {"trigger_send"=>444}]}}
  def add
    if request.headers["Authorization"] != Settings.WWST_AUTHORIZATION_HEADER
      render :json => { success: false }, status: :error
      return
    end
    logger.info("HERE0")
    logger.info(request.raw_post)
    # logger.info("HERE1")
    # logger.info(request.body)
    # logger.info("HERE2")
    # logger.info(request.params)
    # logger.info("HERE3")
    # logger.info(request.params['_json'])
    formatted = formatValues(request.raw_post)
    logger.info("HERE4")
    logger.info(formatted)
    built = Builder.buildLoss(formatted)
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
    formatted
  end

end
