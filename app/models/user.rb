class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_many :boards
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def self.send_daily_email
    User.all.each do |user|
      UserMailer.daily_email(user).deliver_now
    end
  end
end
