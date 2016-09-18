module ApplicationHelper
  def title(separator = " | ")
    [content_for(:title), 'StopHB2gether'].compact.join(separator)
  end

  def hashtag_search_url(hashtag)
    "https://twitter.com/search?f=tweets&vertical=default&q=%23" + hashtag + "&src=typd"
  end

  def formula_html(formula_name)
    'The <a href="#' + formula_name + '-formula" class="link">' + formula_name + ' formula</a> listed above has been applied.'
  end

  def hotel_html(city)
    amount = Settings['HOTEL_PRICE_' + city.upcase]
    link = Settings['HOTEL_SOURCE_' + city.upcase]
    'The average hotel room price in ' + city + ' is <a href="' + link + '" class="link" target="_blank">$' + amount.to_s + '</a>.'
  end

  def average_ticket_price(amount, name, link)
    'The average ticket for ' + name + ' is <a href="' + link + '" class="link" target="blank">$' + amount.to_s + '</a>.'
  end

  def venue(name, city, capacity)
    number = number_with_delimiter(capacity, delimeter: ',')
    "This event was scheduled to take place at #{city}'s #{name}, which has a capacity of #{number}."
  end

  def twitter_loss_share_link(loss)
    tweet = ERB::Util.url_encode(loss.tweet)
    "https://twitter.com/intent/tweet?text=#{tweet}"
  end

  def email_loss_share_link(loss)
    body = ERB::Util.url_encode("something here" + loss.description)
    subject = ERB::Util.url_encode(loss.title)
    "mailto:?subject=#{subject}&body=#{body}"
  end

  def facebook_loss_share_link(loss)
    url = ERB::Util.url_encode("https://www.stophb2gether.com/losses/#{loss.slug}")
    "https://www.facebook.com/sharer/sharer.php?u=#{url}"
  end
end
