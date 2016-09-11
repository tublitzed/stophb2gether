module ApplicationHelper
  def title(separator = " | ")
    [content_for(:title), 'StopHB2gether'].compact.join(separator)
  end
end
