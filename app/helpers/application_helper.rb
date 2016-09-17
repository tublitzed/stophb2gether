module ApplicationHelper
  def title(separator = " | ")
    [content_for(:title), 'StopHB2gether'].compact.join(separator)
  end

  def hashtag_search_url(hashtag)
    "https://twitter.com/search?f=tweets&vertical=default&q=%23" + hashtag + "&src=typd"
  end
end
