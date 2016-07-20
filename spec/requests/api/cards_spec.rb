describe "Card API" do
  it 'gets cards' do
    list = FactoryGirl.create(:list, id: 1)
    card = FactoryGirl.create(:card, list_id: list.id)
    get '/api/lists/1/cards/'
    json = JSON.parse(response.body)
    # test for the 200 status-code
    expect(response).to be_success
    # check to make sure the right amount of messages are returned
    expect(json['cards'].length).to eq(1)
  end

  it "gets cards even when there none" do
    list = FactoryGirl.create(:list, id: 1)
    get '/api/lists/1/cards/'
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['cards'].length).to eq(0)
  end
end
