class Api::CardsController < ApiController
  def index
    cards = Card.where(board_id: params[:board_id])
    render json: { cards: cards }, status: :ok
  end

  def update
    card = Card.find(params[:id])
    list = List.find(params[:list_id])
    card.update(list_id: params[:list_id])
    cards = Card.where(board_id: params[:board_id])
    render json: { cards: cards }, status: :ok
  end

  def create
    new_card = Card.new(text: params[:text])
    new_card.list = List.find(params[:list_id])
    new_card.board = Board.find(params[:board_id])
    new_card.save
    render json: { card: new_card }, status: :ok
  end

  def destroy
    deleted_card = Card.find(params[:id])
    deleted_card.destroy
    cards = Card.where(board_id: params[:board_id])
    render json: { cards: cards }, status: :ok
  end
end
