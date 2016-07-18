require "rails_helper"

feature "user deletes list" do
  let!(:list) { FactoryGirl.create(:list) }
  let!(:list2) { FactoryGirl.create(:list) }

  scenario "user delets lists" do
    visit root_path
    first(:link, "Delete").click

    expect(page).to_not have_content(list.title)
  end
end
