describe "Card API" do
  before do
    @board = FactoryGirl.create(:board, id: 6)
    @list = FactoryGirl.create(:list, board: @board)
    @card = FactoryGirl.create(:card, id: 7, board: @board, list: @list)
  end

  it 'gets cards' do
    get '/api/boards/6/cards/'
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['cards'].length).to eq(1)
  end

  it "posts cards" do
    params = { text: "card text", list_id: @list.id, board_id: @board.id }

    post '/api/boards/6/cards/', params.to_json, { 'ACCEPT' => "application/json", 'CONTENT_TYPE' => 'application/json' }

    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['card']['text']).to eq("card text")
  end

  it "deletes cards" do
    delete '/api/boards/6/cards/7'

    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['cards'].length).to eq(0)
  end

  it "updates cards" do
    params = { text: "card text", list_id: @list.id }

    patch '/api/boards/6/cards/7', params.to_json, { 'ACCEPT' => "application/json", 'CONTENT_TYPE' => 'application/json' }

    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['cards'].length).to eq(1)
  end
end
