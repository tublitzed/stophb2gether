# Min and Max threads per worker
threads_count = Integer(ENV.fetch("RAILS_MAX_THREADS", 5))
threads threads_count, threads_count

# Railway (and most PaaS hosts) route traffic to $PORT
port ENV.fetch("PORT", 3000)

environment ENV.fetch("RAILS_ENV", "development")

# Single process by default; set WEB_CONCURRENCY to run multiple workers
workers Integer(ENV.fetch("WEB_CONCURRENCY", 0))
preload_app!
