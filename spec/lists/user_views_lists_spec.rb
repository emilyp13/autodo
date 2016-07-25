require "rails_helper"

feature "user views list", js: true do
  let!(:board) { FactoryGirl.create(:board) }
  let!(:list) { FactoryGirl.create(:list, board: board) }
  let!(:list2) { FactoryGirl.create(:list, board: board) }

  scenario "user sees lists" do
    visit root_path
    find_link(board.title).trigger('click')

    expect(page).to have_content(list.title)
    expect(page).to have_content(list2.title)
  end
end
