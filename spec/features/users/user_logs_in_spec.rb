require 'rails_helper'

feature 'user logs in' do
  let!(:user) { FactoryGirl.create(:user) }
  scenario 'an existing user specifies a valid username and password' do
    visit root_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_content('Log Out')
    expect(page).to_not have_content('Log in')
  end

  scenario 'user specifies invalid username and password' do
    visit root_path
    fill_in 'Email', with: 'WhoamI'
    fill_in 'Password', with: 'notmypassword'
    click_button 'Log in'

    expect(page).to have_content('Invalid Email or password')
    expect(page).to_not have_content('Signed in successfully')
    expect(page).to_not have_content('Log Out')
  end

  scenario 'user logs out and returns to log in menu' do
    visit root_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: user.password
    click_button 'Log in'

    expect(page).to have_content('Signed in successfully')
    expect(page).to have_content('Log Out')

    click_link 'Log Out'

    expect(page).to have_content('Log In')
  end
end
