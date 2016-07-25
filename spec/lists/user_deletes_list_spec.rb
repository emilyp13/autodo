require "rails_helper"

feature "user deletes list", js: true do
  let!(:list) { FactoryGirl.create(:list) }

  scenario "user delets lists" do
    visit root_path
    find('i.fa.fa-trash-o').trigger('click')

    expect(page).to_not have_content(list.title)
  end
end
