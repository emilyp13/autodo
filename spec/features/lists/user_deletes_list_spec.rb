require "rails_helper"

feature "user deletes list", js: true do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:board) { FactoryGirl.create(:board, user: user) }
  let!(:list) { FactoryGirl.create(:list, board: board) }

  scenario "user delets lists" do
    login_user(user)
    find_link(board.title).trigger('click')
    find('a.fa.fa-trash-o').trigger('click')

    expect(page).to_not have_content(list.title)
  end
end
