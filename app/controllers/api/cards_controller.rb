class Api::CardsController < ApiController

  def grabListsandCards
    @cards = Card.where(board_id: params[:board_id])
    @lists = List.where(board_id: params[:board_id])
  end

  def index
    grabListsandCards
    if @cards.nil?
      @cards = []
    end
    render json: { lists: @lists, cards: @cards }, status: :ok
  end

  def update
    grabListsandCards
    card = Card.find(params[:id])
    list = List.find(params[:list_id])
    card.update(list_id: params[:list_id])
    render json: { lists: @lists, cards: @cards }, status: :ok
  end

  def create
    grabListsandCards
    new_card = Card.new(text: params[:text])
    new_card.list = List.find(params[:list_id])
    new_card.board = Board.find(params[:board_id])
    new_card.save
    render json: { lists: @lists, cards: @cards }, status: :ok
  end

  def destroy
    grabListsandCards
    deleted_card = Card.find(params[:id])
    deleted_card.destroy
    cards = Card.where(list_id: deleted_card.list_id)
    render json: { lists: @lists, cards: @cards }, status: :ok
  end
end
