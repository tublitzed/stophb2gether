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
    'The average hotel room price in ' + city + ' is <a href="#hotel-price-list" class="link">$' + amount.to_s + '</a>.'
  end
end
