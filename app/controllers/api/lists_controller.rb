class Api::ListsController < ApiController
  def index
    lists = List.all
    cards = Card.all
    render json: { lists: lists, cards: cards }, status: :ok
  end

  def create
    @card = Card.new(text: params[:text])
    @card.list = List.find(params[:list_id])
    @card.save
    lists = List.all
    cards = Card.all
    render json: { lists: lists, cards: cards }, status: :ok
  end
end
