require "rails_helper"

feature "user deletes card", js: true do
  let!(:list) { FactoryGirl.create(:list, board: board) }
  let!(:board) { FactoryGirl.create(:board) }
  let!(:card) { FactoryGirl.create(:card, board: board, list: list) }

  scenario "user deletes card" do
    visit root_path
    find_link(board.title).trigger('click')

    within(:css, '.incomplete-card') do
      find('i.fa.fa-trash-o').trigger('click')
    end

    expect(page).to_not have_content(card.text)
  end
end
