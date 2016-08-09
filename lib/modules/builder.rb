require 'httparty'
require 'logger'

module Builder
  def self.buildLoss(data)
    url = Settings.WORDSMITH_TEMPLATE_URL + '?access_token=' + Settings.WORDSMITH_API_TOKEN
    response = HTTParty.post(url, :query => { :data => data })
    data['template'] = response['data']['content']

    Rails.logger.info(data)

    loss = Loss.find_or_create_by({slug: data['slug']})
    loss.update(data)
    loss.save

    Rails.logger.info(loss)
    loss
  end
end
