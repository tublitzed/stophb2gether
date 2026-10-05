# Assets are no longer compiled; the views load the prebuilt bundle in public/
# (css/styles.css, scripts/app.js). Hosts like Railway run assets:precompile
# automatically, so replace it with a no-op instead of compiling the old Sass.
Rake::Task["assets:precompile"].clear if Rake::Task.task_defined?("assets:precompile")

namespace :assets do
  task :precompile do
    puts "Skipping assets:precompile (serving prebuilt bundle from public/)"
  end
end
