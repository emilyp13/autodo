require "rails_helper"

feature "user views cards", js: true do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:board) { FactoryGirl.create(:board) }
  let!(:list) { FactoryGirl.create(:list, board: board) }
  let!(:card) { FactoryGirl.create(:card, board: board, list: list) }
  let!(:card2) { FactoryGirl.create(:card, board: board, list: list) }

  scenario "user sees cards" do
    login_user(user)
    find_link(board.title).trigger('click')

    expect(page).to have_content(card.text)
    expect(page).to have_content(card.description)
    expect(page).to have_content(card2.text)
    expect(page).to have_content(card2.description)
  end
end
