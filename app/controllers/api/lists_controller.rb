class Api::ListsController < ApiController
  def index
    lists = List.all
    render json: { lists: lists }, status: :ok
  end

  def create
    @card = Card.new(text: params[:text])
    @card.list = List.find(params[:list_id])
    @card.save
    lists = List.all
    render json: { lists: lists }, status: :ok
  end

  def new
    binding.pry
    @list = List.new
  end
end
