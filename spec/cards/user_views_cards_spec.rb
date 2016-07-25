require "rails_helper"

feature "user views cards", js: true do
  let!(:list) { FactoryGirl.create(:list) }
  let!(:card) { FactoryGirl.create(:card) }
  let!(:card2) { FactoryGirl.create(:card) }

  scenario "user sees cards" do
    visit root_path

    expect(page).to have_content(card.text)
    expect(page).to have_content(card2.text)
  end
end
