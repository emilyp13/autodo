require "rails_helper"

feature "user deletes list", js: true do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:board) { FactoryGirl.create(:board) }
  let!(:list) { FactoryGirl.create(:list, board: board) }

  scenario "user delets lists" do
    login_user(user)
    find_link(board.title).trigger('click')
    find('i.fa.fa-trash-o').trigger('click')

    expect(page).to_not have_content(list.title)
  end
end
