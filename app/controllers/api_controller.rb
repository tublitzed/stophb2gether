class ApiController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:add]

  def add
    if request.headers["Authorization"] != Settings.WWST_AUTHORIZATION_HEADER
      render :json => { success: false }, status: :error
      return
    end
    puts request.raw_post
    render :json => request.raw_post
  end

end
