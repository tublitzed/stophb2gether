module SessionsHelper

  # Logs in the given user.
  def log_in(user)
    session[:user_id] = user.id

    logger.info('Logging in user: ' + user.email + ' at ' + DateTime.now.to_s)
  end

  # Remembers a user in a persistent session.
  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent[:remember_token] = user.remember_token
  end

  # Returns the user corresponding to the remember token cookie.
  def current_user
    session_user_id = session[:user_id]
    cookies_user_id = cookies.signed[:user_id]

    if (session_user_id)
      @current_user ||= User.find_by(id: session_user_id)
    elsif (cookies_user_id) # handle remember tokens
      user = User.find_by(id: cookies_user_id)
      if user && user.authenticated?(cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  # Returns true if the user is logged in, false otherwise.
  def logged_in?
    !current_user.nil?
  end

  # Forgets a persistent session.
  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  # Logs out the current user.
  def log_out
    logger.info('Logging out user: ' + current_user.email + ' at ' + DateTime.now.to_s)
    forget(current_user)
    session.delete(:user_id)
    @current_user = nil
  end
end
