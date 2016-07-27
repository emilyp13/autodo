require "rails_helper"

feature "user views a board", js: true do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:board) { FactoryGirl.create(:board, user: user) }
  let!(:list) { FactoryGirl.create(:list, board: board) }

  scenario "user sees board details" do
    login_user(user)
    find_link(board.title).trigger('click')

    expect(page).to have_content(board.title)
    expect(page).to have_content(list.title)
  end
end
