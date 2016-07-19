require "rails_helper"

feature "user deletes list" do
  let!(:list) { FactoryGirl.create(:list) }
  let!(:card) { FactoryGirl.create(:card) }
  let!(:card2) { FactoryGirl.create(:card) }

  scenario "user delets lists" do
    visit root_path
    click_link card.text
    click_link "Delete"

    expect(current_path).to eq("/lists")
    expect(page).to_not have_content(card.text)
  end
end
