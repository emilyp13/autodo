describe "List API" do
  it 'sends and gets lists' do
    FactoryGirl.create_list(:list, 10)
    get '/api/lists'
    json = JSON.parse(response.body)
    # test for the 200 status-code
    expect(response).to be_success

    # check to make sure the right amount of messages are returned
    expect(json['lists'].length).to eq(10)
  end
end
