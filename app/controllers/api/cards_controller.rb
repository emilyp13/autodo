class Api::CardsController < ApiController
  def grab_lists_and_cards
    @cards = Card.where(board_id: params[:board_id])
    @lists = List.where(board_id: params[:board_id])
  end

  def index
    if @cards.nil?
      @cards = []
    end
    grab_lists_and_cards
    render json: { lists: @lists, cards: @cards }, status: :ok
  end

  def update
    card = Card.find(params[:id])
    list = List.find(params[:list_id])
    card.update(list_id: params[:list_id])
    grab_lists_and_cards
    render json: { lists: @lists, cards: @cards }, status: :ok
  end

  def create
    new_card = Card.new(text: params[:text])
    new_card.list = List.find(params[:list_id])
    new_card.board = Board.find(params[:board_id])
    new_card.save
    grab_lists_and_cards
    render json: { lists: @lists, cards: @cards }, status: :ok
  end

  def destroy
    deleted_card = Card.find(params[:id])
    deleted_card.destroy
    grab_lists_and_cards
    render json: { lists: @lists, cards: @cards }, status: :ok
  end
end
