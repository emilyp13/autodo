require "rails_helper"

feature "user deletes list", js: true do
  let!(:list) { FactoryGirl.create(:list) }
  let!(:card) { FactoryGirl.create(:card) }

  scenario "user deletes lists" do
    visit root_path
    within(:css, '.incomplete-card') do
      find('i.fa.fa-trash-o').trigger('click')
    end
    
    expect(page).to_not have_content(card.text)
  end
end
