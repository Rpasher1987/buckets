source 'https://rubygems.org'
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby '3.1.2'

# Core
gem 'rails', '~> 6.1.6'
gem 'puma', '~> 5.0'
gem 'sass-rails', '>= 6'
gem 'webpacker', '~> 5.0'
gem 'jbuilder', '~> 2.7'

# Database
gem 'sqlite3', '~> 1.4'

group :production do
  gem 'pg', '~> 1.4.3'
end

# Admin Interface
gem 'rails_admin', '~> 2.0'

# Payments
# gem 'stripe'

# Pagination
gem 'kaminari'

# Authentication
gem 'bcrypt', '~> 3.1.7'

# AWS S3
gem 'aws-sdk-s3', '~> 1.114'

# Misc
gem 'webrick', '~> 1.7'
gem 'mail', '>= 2.8.0.rc1'
gem 'bootsnap', '>= 1.4.4', require: false
gem 'dotenv-rails', '~> 2.8'
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
  gem 'awesome_print', '~> 1.9'
  gem 'factory_bot_rails', '~> 6.2'
  gem 'pry-rails', '>= 0.3.9'
  gem 'rspec-rails', '~> 5.1'
  gem 'rubocop', '~> 1.36'
  gem 'rubocop-rspec', '2.12'
end

group :development do
  gem 'listen', '~> 3.7.1'
  gem 'web-console', '>= 4.2'
  gem 'spring', '< 3.0'
  gem 'spring-watcher-listen', '~> 2.0.1'
end

group :test do
  gem 'capybara', '>= 3.26'
  gem 'selenium-webdriver', '>= 4.0.0.rc1'
  gem 'webdrivers'
end
