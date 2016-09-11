require 'httparty'
require 'logger'

module Builder
  def self.buildLoss(data)
    template = self.getWordsmithTemplate(data)
    formatted = self.formatLoss(data, template)

    Rails.logger.info(formatted)

    loss = Loss.find_or_create_by({slug: formatted['slug']})
    loss.update(formatted)
    loss.save

    Rails.logger.info(loss)
    loss
  end

  def self.getWordsmithTemplate(data)
    url = Settings.WORDSMITH_TEMPLATE_URL + '?access_token=' + Settings.WORDSMITH_API_TOKEN
    response = HTTParty.post(url, :query => { :data => data })

    Rails.logger.info(response)
    response['data']['content']
  end

  def self.formatLoss(data, template)
    formatted = {
      'template' => template,
      'active' => data['active'] || false,
      'featured' => data['featured'] || false
    }
    acceptedFields = [
      'date',
      'amount',
      'title',
      'slug',
      'description',
      'sources',
      'short_name'
    ]

    acceptedFields.each do |field|
      formatted[field] = data[field]
    end

    formatted
  end

end
