require "rails_helper"

feature "user views a board", js: true do
  let!(:board) { FactoryGirl.create(:board) }
  let!(:list) { FactoryGirl.create(:list, board: board) }

  scenario "user sees board details" do
    visit root_path
    find_link(board.title).trigger('click')

    expect(page).to have_content(board.title)
    expect(page).to have_content(list.title)
  end
end
