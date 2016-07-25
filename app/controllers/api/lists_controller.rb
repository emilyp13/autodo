class Api::ListsController < ApiController

  def grabListsAndCards
    @cards = Card.where(board_id: params[:board_id])
    @lists = List.where(board_id: params[:board_id])
  end

  def index
    grabListsAndCards
    render json: { lists: @lists, cards: @cards }, status: :ok
  end

  def create
    grabListsAndCards
    list = List.new(title: params[:text])
    list.board = Board.find(params[:board_id])
    list.save
    render json: { lists: @lists, cards: @cards }, status: :ok
  end

  def destroy
    grabListsAndCards
    @list = List.find(params[:id])
    @list.destroy
    render json: { lists: @lists, cards: @cards }, status: :ok
  end
end
