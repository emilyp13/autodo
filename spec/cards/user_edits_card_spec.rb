require "rails_helper"

feature "user edits card" do
  let!(:list) { FactoryGirl.create(:list) }
  let!(:card) { FactoryGirl.create(:card) }
  let!(:card2) { FactoryGirl.create(:card) }

  before do
    visit root_path
    click_link card.text
  end

  scenario "user successfully edits a card" do
    fill_in "Text", with: "My Card text blah blah"
    click_button "Update Card"

    expect(page).to have_content("My Card text blah blah")
  end

  scenario "user unsuccessfully edits a card" do
    fill_in "Text", with: ""
    click_button "Update Card"

    expect(page).to have_content("Text can't be blank")
  end
end
