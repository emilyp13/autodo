class Api::ListsController < ApiController
  def index
    lists = List.all
    cards = Card.all
    render json: { lists: lists, cards: cards }, status: :ok
  end

  def create
    @list = List.new(title: params[:text])
    @list.save
    lists = List.all
    cards = Card.all
    render json: { lists: lists, cards: cards }, status: :ok
  end

  def new
    @list = List.new
  end
end
