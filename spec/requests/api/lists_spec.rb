describe "List API" do
  before do
    @list = FactoryGirl.create(:list)
  end

  it 'gets lists' do
    get '/api/lists'
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['lists'].length).to eq(1)
  end

  it "posts lists" do
    params = {text: "list title"}
    post "/api/lists", params.to_json, {'ACCEPT' => "application/json", 'CONTENT_TYPE' => 'application/json'}
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['lists'].length).to eq(2)
  end

  it "deletes lists" do
    delete "/api/lists/#{@list.id}"
    json = JSON.parse(response.body)
    expect(response).to be_success
    expect(json['lists'].length).to eq(0)
  end
end
