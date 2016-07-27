require "rails_helper"

feature "user views list of boards" do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:board) { FactoryGirl.create(:board, user: user) }
  let!(:board2) { FactoryGirl.create(:board, user: user) }

  scenario "user sees a list of boards" do
    login_user(user)
    expect(page).to have_content(board.title)
    expect(page).to have_content(board2.title)
  end
end
