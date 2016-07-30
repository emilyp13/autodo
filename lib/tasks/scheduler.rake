task :send_email => :environment do
  UserMailer.daily_email(user).deliver_now
end
