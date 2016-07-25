require "rails_helper"

feature "user creates a board" do
  scenario "user successfully creates a board" do
    visit root_path
    click_link "New Board"

    fill_in "Title", with: "my new board"
    click_button "Create Board"
    expect(page).to have_content("my new board")
  end
end
