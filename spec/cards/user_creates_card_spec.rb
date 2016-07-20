require "rails_helper"

feature "user creates card", js: true do
  before do
    @button_link = "create-card-button-#{list.id}"
    visit root_path
  end

  context do
    let!(:list) { FactoryGirl.create(:list) }
    scenario "user successfully creates a card" do
      fill_in "text-input-1", with: "Complete my application"
      find(@button_link).trigger('click')
      expect(page).to have_content("Complete my application")
    end

    scenario "user unsuccessfully creates a card" do
      fill_in "text-input-1", with: "Complete my application"
      find(@button_link).trigger('click')

      expect(page).to have_content("Text can't be blank")
    end
  end
end
