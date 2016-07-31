class UserMailer < ApplicationMailer
  def daily_email(user)
    @user = user
    @boards = @user.boards.where(category: "calendar")
    @boards.each do |board|
      @lists = board.lists.where(title: Date.today.strftime('%a %b %d'))
    end
    mail(to: @user.email, subject: "Today's Schedule for #{@user.email}")
  end
end
