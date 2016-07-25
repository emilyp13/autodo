require "rails_helper"

feature "user creates list", js: true do
  before do
    visit root_path
  end

  scenario "user successfully creates a list" do
    fill_in "Add a new list...", with: "My List"
    find_button('Add List').trigger('click')

    expect(page).to have_content("My List")
  end

  xscenario "user unsuccessfully creates a list" do
    fill_in "Title", with: ""
    click_button "Create List"

    expect(page).to have_content("Title can't be blank")
  end
end
