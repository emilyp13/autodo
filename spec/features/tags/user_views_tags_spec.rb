require "rails_helper"

feature "user views a tag", js: true do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:board) { FactoryGirl.create(:board, user: user) }
  let!(:list) { FactoryGirl.create(:list, board: board) }
  let!(:card) { FactoryGirl.create(:card, board: board, list: list) }
  let!(:tag) { FactoryGirl.create(:tag, board: board) }

  scenario "user views a tag" do
    login_user(user)
    find_link(board.title).trigger('click')

    expect(page).to have_content(tag.label)
  end
end
