module ApplicationHelper
  def page_title(separator = " | ")
    [content_for(:title), 'WeWillStopThis'].compact.join(separator)
  end
end
