require "rails_helper"

feature "user creates card", js: true do
  let!(:list) { FactoryGirl.create(:list) }

  before do
    visit root_path
  end

  scenario "user successfully creates a card" do
    fill_in "Add a new card...", with: "Complete my application"
    find('input.submit-button').trigger('click')
    sleep(5)
    save_and_open_page
    expect(page).to have_content("Complete my application")
  end

  xscenario "user unsuccessfully creates a card" do
    fill_in "Text", with: ""
    click_button "Create Card"

    expect(page).to have_content("Text can't be blank")
  end
end
