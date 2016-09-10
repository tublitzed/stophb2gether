module ApplicationHelper
  def title(separator = " | ")
    puts "HERE......"
    [content_for(:title), 'StopHB2gether'].compact.join(separator)
  end
end
