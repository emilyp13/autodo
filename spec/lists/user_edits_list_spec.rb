require "rails_helper"

feature "user edits list" do
  let!(:list) { FactoryGirl.create(:list) }
  let!(:list2) { FactoryGirl.create(:list) }

  before do
    visit root_path
    first(:link, "Edit").click
  end

  scenario "user successfully creates a list" do
    fill_in "Title", with: "My List"
    click_button "Update List"

    expect(page).to have_content("My List")
  end

  scenario "user unsuccessfully creates a list" do
    fill_in "Title", with: ""
    click_button "Update List"

    expect(page).to have_content("Title can't be blank")
  end
end
