require "rails_helper"

feature "user creates card" do
  let!(:list) { FactoryGirl.create(:list) }

  before do
    visit root_path
    first(:link, "Add Card").click
  end

  scenario "user successfully creates a card" do
    fill_in "Text", with: "Complete my application"
    click_button "Create Card"

    expect(page).to have_content("Complete my application")
  end

  scenario "user unsuccessfully creates a card" do
    fill_in "Text", with: ""
    click_button "Create Card"

    expect(page).to have_content("Text can't be blank")
  end
end
