describe "Card API" do
  before do
    @list = FactoryGirl.create(:list, id: 1)
    @list2 = FactoryGirl.create(:list, id: 4)
    @card = FactoryGirl.create(:card, list_id: @list.id)
  end

  it 'gets cards' do
    get '/api/lists/1/cards/'
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['cards'].length).to eq(1)
  end

  it "gets cards even when there none" do
    get '/api/lists/1/cards/'
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['cards'].length).to eq(1)
  end

  it "posts cards" do
    params = {text: "card text", list_id: @list.id}

    post "/api/cards", params.to_json, {'ACCEPT' => "application/json", 'CONTENT_TYPE' => 'application/json'}

    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['cards'].length).to eq(2)
  end

  it "deletes cards" do
    delete "/api/cards/#{@card.id}"

    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['cards'].length).to eq(0)
  end

  it "updates cards" do
    params = {text: "card text", list_id: @list2.id}

    patch "/api/cards/#{@card.id}", params.to_json, {'ACCEPT' => "application/json", 'CONTENT_TYPE' => 'application/json'}

    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['cards'].length).to eq(1)
  end
end
