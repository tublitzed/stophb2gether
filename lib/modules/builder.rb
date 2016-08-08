require 'httparty'

module Builder
  def self.buildLoss(data)
    puts 'Attempting to build with: '
    puts data

    url = Settings.WORDSMITH_TEMPLATE_URL + '?access_token=' + Settings.WORDSMITH_API_TOKEN

    response = HTTParty.post(url, :query => { :data => data })
    puts response
    template = response['data']['content']
    puts template
  end
end
