class Api::CardsController < ApiController
  def index
    cards = Card.all
    if cards.nil?
      cards = []
    end
    render json: { cards: cards }, status: :ok
  end

  def update
    card = Card.find(params[:id])
    list = List.find(params[:list_id])
    card.update(list_id: params[:list_id])
    cards = Card.all
    render json: { cards: cards }, status: :ok
  end

  def create
    @card = Card.new(text: params[:text])
    @card.list = List.find(params[:list_id])
    @card.save
    lists = List.all
    render json: { lists: lists }, status: :ok
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    cards = Card.where(list_id: @card.list_id)
    render json: { cards: cards }, status: :ok
  end
end
