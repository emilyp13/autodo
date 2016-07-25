require "rails_helper"

feature "user views list of boards" do
  let!(:board) { FactoryGirl.create(:board) }
  let!(:board2) { FactoryGirl.create(:board) }

  scenario "user sees a list of boards" do
    visit root_path
    expect(page).to have_content(board.title)
    expect(page).to have_content(board2.title)
  end
end
