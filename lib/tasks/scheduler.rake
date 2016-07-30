task :send_email => :environment do
  User.send_daily_email
end
