require "rails_helper"

xfeature "user creates a tag", js: true do
  let!(:user) { FactoryGirl.create(:user) }
  let!(:board) { FactoryGirl.create(:board, user: user) }
  let!(:list) { FactoryGirl.create(:list, board: board) }
  let!(:card) { FactoryGirl.create(:card, board: board) }

  scenario "user creates a tag" do
  end
end
