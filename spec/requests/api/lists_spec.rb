describe "List API" do
  before do
    @board = FactoryGirl.create(:board, id: 5)
    @list = FactoryGirl.create(:list, id: 4, board: @board)
  end

  it 'gets lists' do
    get '/api/boards/5/lists'
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['lists'].length).to eq(1)
  end

  it "posts lists" do
    params = { text: "list title", board_id: @list.board_id }
    post '/api/boards/5/lists', params.to_json, { 'ACCEPT' => "application/json", 'CONTENT_TYPE' => 'application/json' }
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['lists'].length).to eq(2)
  end

  it "deletes lists" do
    delete '/api/boards/5/lists/4'
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['lists'].length).to eq(0)
  end
end
