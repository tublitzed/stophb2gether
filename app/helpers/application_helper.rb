module ApplicationHelper
  def page_title(separator = " | ")
    [content_for(:title), 'StopHB2gether'].compact.join(separator)
  end
end
