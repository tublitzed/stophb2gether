class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:add]

  def add
    if request.headers["Authorization"] != Settings.WWST_AUTHORIZATION_HEADER
      render :json => { success: false }, status: :error
      return
    end
    logger.info(request.raw_post)
    formatted = formatValues(ActiveSupport::JSON.decode(request.raw_post))
    logger.info(formatted)
    built = Builder.buildLoss(formatted)
    logger.info(built)
    render :json => ActiveSupport::JSON.encode(built)
  end

  private

  def formatValues(postValues)
    formatted = {}
    # Note: when changing values here, remember to also change in builder.rb
    acceptedFields = [
      'date',
      'title',
      'name',
      'slug',
      'amount',
      'percentage_of_total',
      'location',
      'description',
      'scheduled_date',
      'type',
      'type_count',
      'statement',
      'statement_fragment',
      'statement_author',
      'statement_author_title',
      'statement_author_type',
      'statement_source',
      'statement_url',
      'grand_total',
      'notes',
      'metadata',
      'short_name',
      'sources',
      'complete',
      'trigger_send'
    ]

    acceptedFields.each do |field|
      formatted[field] = postValues[field]
    end

    formatted
  end

end
