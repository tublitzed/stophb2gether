require 'httparty'

module Builder
  def self.buildLoss(data)
    url = Settings.WORDSMITH_TEMPLATE_URL + '?access_token=' + Settings.WORDSMITH_API_TOKEN
    response = HTTParty.post(url, :query => { :data => data })
    data['template'] = response['data']['content']
    data
  end
end
