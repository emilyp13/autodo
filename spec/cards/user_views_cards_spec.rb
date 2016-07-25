require "rails_helper"

feature "user views cards", js: true do
  let!(:board) { FactoryGirl.create(:board) }
  let!(:list) { FactoryGirl.create(:list, board: board) }
  let!(:card) { FactoryGirl.create(:card, board: board, list: list) }
  let!(:card2) { FactoryGirl.create(:card, board: board, list: list) }

  scenario "user sees cards" do
    visit root_path
    find_link(board.title).trigger('click')

    expect(page).to have_content(card.text)
    expect(page).to have_content(card2.text)
  end
end
