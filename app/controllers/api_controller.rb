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
      "active",
      "amount",
      "complete",
      "date",
      "description",
      "featured",
      "grand_total",
      "location",
      "metadata",
      "name",
      "notes",
      "percentage_of_total",
      "photo_credit",
      "scheduled_date",
      "short_name",
      "slug",
      "sources",
      "statement",
      "statement_author",
      "statement_author_title",
      "statement_author_type",
      "statement_fragment",
      "statement_source",
      "statement_url",
      "title",
      "trigger_send",
      "tweet",
      "type",
      "type_count",
      "venue"
    ]

    acceptedFields.each do |field|
      formatted[field] = postValues[field]
    end

    formatted
  end

end
