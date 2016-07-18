require "rails_helper"

feature "user creates list" do
  before do
    visit root_path
    click_link "Add List"
  end

  scenario "user successfully creates a list" do
    fill_in "Title", with: "My List"
    click_button "Create List"

    expect(page).to have_content("My List")
  end

  scenario "user unsuccessfully creates a list" do
    fill_in "Title", with: ""
    click_button "Create List"

    expect(page).to have_content("Title can't be blank")
  end
end
