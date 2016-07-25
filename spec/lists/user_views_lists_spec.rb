require "rails_helper"

feature "user views list", js: true do
  let!(:list) { FactoryGirl.create(:list) }
  let!(:list2) { FactoryGirl.create(:list) }

  scenario "user sees lists" do
    visit root_path

    expect(page).to have_content(list.title)
    expect(page).to have_content(list2.title)
  end
end
