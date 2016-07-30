require 'rails_helper'

feature "User receives daily email" do
  let!(:today) { Date.today.strftime('%a %b %d') }
  let!(:user) { FactoryGirl.create(:user) }
  let!(:board) { FactoryGirl.create(:board, user_id: user.id, category: "calendar") }
  let!(:list) { FactoryGirl.create(:list, board: board, title: today) }
  let!(:list2) { FactoryGirl.create(:list, board: board) }
  let!(:card) { FactoryGirl.create(:card, board: board, list: list) }
  let!(:card2) { FactoryGirl.create(:card, board: board, list: list) }

  scenario "user receives email" do
    UserMailer.daily_email(user).deliver_now

    expect(ActionMailer::Base.deliveries.count).to eq(1)

    email = ActionMailer::Base.deliveries.last

    expect(email.to.first).to eq(board.user.email.to_s)
    expect(email.subject).to eq("Today's Schedule for #{user.email}")
    expect(email.body.to_s).to include(board.title)
    expect(email.body.to_s).to include(card.text)
    expect(email.body.to_s).to include(card2.text)
  end
end
