require "rails_helper"

feature "user views list", js: true do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:board) { FactoryGirl.create(:board) }
  let!(:list) { FactoryGirl.create(:list, board: board) }
  let!(:list2) { FactoryGirl.create(:list, board: board) }

  scenario "user sees lists" do
    login_user(user)
    find_link(board.title).trigger('click')

    expect(page).to have_content(list.title)
    expect(page).to have_content(list2.title)
  end
end
